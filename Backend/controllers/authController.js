const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');
const User = require('../models/userModel');

const signToken = id => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
}

const createSendToken = (user, statusCode, res) =>{
  const token = signToken(user._id);
  const cookieOptions = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
      httpOnly: true
  };
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
      status: 'scuccess',
      token,
      data: {
        user
      }
  });
}

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });
    createSendToken(newUser, 201, res);
  } catch(err) {
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
}

exports.login = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    if(!email || !password) {
      return next( new Error('Please confirm your input')); 
    }
    const user = await User.findOne({email: email}).select('+password');
    const correct = await user.correctPassword(password, user.password);
    if(!user || !correct) {
      return next(new Error('incorrect email or password!'));
    }

    createSendToken(user, 201, res);
  }catch(err){
    res.status(400).json({
      status: 'fail',
      message: err
    });
  }
}

exports.logout = (req, res, next) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 1000),
    httpOnly: true
};
  res.cookie('jwt', 'loggingout', cookieOptions);
  res.status(200).json({
      status: 'scuccess'
  });
}

exports.protect = async (req, res, next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1];
  } else if (req.cookie.jwt) {
    token = req.cookie.jwt;
  }
  if(!token) {
    return next(new Error('please login again!'));
  }
  
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const freshUser = await User.findById(decoded.id);
  if(!freshUser) {
    return next(new Error('User does not exist!'));
  }

  if(freshUser.changePasswordAfter(decoded.iat)){
    return next(new Error('Please login again!'));
  };
  req.user = freshUser;
  next();
}

exports.isLoggedIn = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );

      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user)){
      return next(new Error('You do not have permission'));
    }
    next();
  }
}

exports.forgotPassword = async (req, res, next) => {
  try{
    const user = await User.findOne({email: req.body.email});
    if(!user) {
      return next(new Error('User does not exist!'));
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({validateBeforeSave: false});
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to ${resetURL}.\nIf you did not forget your password, please ignore this email!`;
    try{
      await sendEmail({
          email: user.email,
          subject: 'Your password reset token',
          message
      });
      res.status(200).json({
          status: 'success',
          message: 'Token sent to email!'
      });
  }catch(err){
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({validateBeforeSave: false});

      return next(new Error('There was an error sending  the email. Try again later!'));
  }
    next();
  } catch(err) {
    res.status(404).json({
      status: 'fail',
      err
    })
  }
  
}

exports.resetPassword = async (req, res, next) => {
  try {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({passwordResetToken: hashedToken, passwordResetExpires: {$gt: Date.now()}});
    if(!user){
      return next(new Error('Token is invlid or has expired'));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    createSendToken(user, 201, res);
  } catch(err) {
    res.status(404).json({
      status: 'fail',
      err
    })
  }
}

exports.updatePassword = async (req, res, next) => {
  try {
    const user = await User.findOne(req.user._id).select('+password');
    if(!user) {
      return next(new Error('please login again!'));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    createSendToken(user, 201, res);
  } catch(err){
    res.status(404).json({
      status: 'fail',
      err
    })
  }
}