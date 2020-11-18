const mongoose = require('mongoose');
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

exports.searchUser = async (req, res, next) => {
  try{
    const queryObj = {...req.query};
    const excluedeFields = ['page', 'sort', 'limit', 'fields'];
    excluedeFields.forEach(el => delete queryObj[el]);
    const users = await User.find(queryObj).select('firstName email city');

    res.status(200).json({
      status: 'success',
      data: users
    })
  } catch(error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
}

exports.addFriends = async (req, res, next) => {
  try {
    console.log(req.user.id);
    console.log(req.body);
    
    const user = await User.findById(req.user.id);
    user.friends.push(req.body.friends);
    await user.save({validateBeforeSave: false});

    res.status(200).json({
      status: 'success',
      data: user
    })
  } catch(error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
}

exports.getFriends = async (req, res, next) => {
  try{
    console.log(req.user.id)
    const user = await User.findById(req.user.id).populated('list');
    console.log(user)
    // const update = await user.populate({
    //   path:"friends",
    //   model:"User"
    // });
    // console.log('------',update)
    res.status(200).json({
      status: 'success',
      data: user
    })
  } catch(error) {
    res.status(400).json({
      status: 'fail',
      message: error
    });
  }
}