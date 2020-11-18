const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/isAuth', authController.isAuth);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword:token', authController.resetPassword);

router.use(authController.protect);

router.get('/getMe', userController.getMe);
router.patch('/changePassword',  authController.updatePassword);
router.patch('/updateUser',  userController.updateMe);
router.get('/search', userController.searchUser);
router.patch('/addFriends', userController.addFriends);
router.get('/friends', userController.getFriends);

module.exports = router;