const Product = require("../models/product");

exports.postAddProduct=async(req,res,next)=>{
    try{
        console.log("inside post add-product..");
        console.log(req.body);
        const {photo,title,description,rating,reviewNumbers,actualPrice,MRP,discounts}=req.body;
        const product=new Product({photo,title,description,rating,reviewNumbers,actualPrice,MRP,discounts});
        const addedProduct=await product.save();
        res.status(201).json(addedProduct);
    }catch(err){
        console.log("error while add a product thr admin..",err);
    }
};