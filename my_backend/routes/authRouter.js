const express=require('express');

const authRouter=express.Router();
const authController=require('../controllers/authController');

authRouter.post('/sign-in',authController.postSignIn);
authRouter.post('/login',authController.postLogin);

module.exports=authRouter;