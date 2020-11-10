const User = require('../models/userModel');

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if(!user) {
      return next(new Error('Please log in again'));
    }
    res.status(200).json({
      status: 'success',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
}

exports.updateMe = async (req, res, next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      data: updateUser
    })
  }catch(error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
}