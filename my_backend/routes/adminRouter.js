const express=require('express');

const adminRouter=express.Router();
const adminController=require('../controllers/adminController');

adminRouter.post('/add-product',adminController.postAddProduct);
adminRouter.delete('/remove-product/:productId',adminController.postRemoveProduct);
module.exports=adminRouter;