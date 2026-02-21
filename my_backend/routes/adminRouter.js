const express=require('express');

const adminRouter=express.Router();
const adminController=require('../controllers/adminController');

adminRouter.post('/add-product',adminController.postAddProduct);
adminRouter.delete('/remove-product/:productId',adminController.postRemoveProduct);
adminRouter.put('/modify-product/:productId',adminController.putModifyProduct);
adminRouter.get('/:productId',adminController.getProduct);

module.exports=adminRouter;