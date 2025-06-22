const express=require('express');
const router=express.Router();
const {body}= require('express-validator')
const userController=require('../controller/user.controller')
const authMiddleware=require('../middleware/auth.middleware');
router.post('/register',[
        body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:3}).withMessage('name should be more than 3 letters'),
    body('password').isLength({min:6}).withMessage('password should be more than 6 letters'),


],userController.registerUser)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password should be more than 6 letters'),
], userController.loginUser);
router.get('/profile',authMiddleware.authUser,userController.getUserProfile)
router.get('/logout',authMiddleware.authUser,userController.logoutUser)

module.exports=router;

