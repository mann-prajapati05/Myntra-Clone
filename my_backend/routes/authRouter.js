const express=require('express');

const authRouter=express.Router();
const authController=require('../controllers/authController');

authRouter.post('/signup',authController.postSignup);
authRouter.post('/login',authController.postLogin);
authRouter.post('/logout',authController.postLogout);
authRouter.get('/verify',authController.verifyUser);

module.exports=authRouter;