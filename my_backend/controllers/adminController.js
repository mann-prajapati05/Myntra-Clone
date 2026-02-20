const Product = require("../models/product");
const { ObjectId } = require('mongodb');

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

exports.postRemoveProduct= async(req,res,next)=>{
    try{
        const pid=req.params.productId;
        console.log("pid",pid);
        const product=await Product.findByIdAndDelete(pid);
        console.log("Product removed!!",product);
        res.status(201).json({productId:pid});
    }catch(err){
        console.log("something went wrong ! while removing product!!",err);
    }
}