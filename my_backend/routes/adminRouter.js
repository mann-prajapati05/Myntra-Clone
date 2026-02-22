const express=require('express');

const adminRouter=express.Router();
const adminController=require('../controllers/adminController');
const { upload } = require('../middlewares/multer.middleware');

adminRouter.post('/add-product',upload.single("photo"),adminController.postAddProduct);
adminRouter.delete('/remove-product/:productId',adminController.postRemoveProduct);
adminRouter.put('/modify-product/:productId',upload.single("photo"),adminController.putModifyProduct);
adminRouter.get('/:productId',adminController.getProduct);

module.exports=adminRouter;