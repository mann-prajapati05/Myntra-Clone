const express=require('express');

const adminRouter=express.Router();
const adminController=require('../controllers/adminController');

adminRouter.post('/add-product',adminController.postAddProduct);

module.exports=adminRouter;