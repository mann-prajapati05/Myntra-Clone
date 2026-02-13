const express=require('express');

const bagRouter=express.Router();
const bagController=require('../controllers/bagController');

bagRouter.post('/:productId',bagController.postAddtoBag);
bagRouter.delete('/:productId',bagController.deleteFromBag);
bagRouter.get('/',bagController.getBag);
bagRouter.get('/items',bagController.getBagItems);

module.exports=bagRouter;