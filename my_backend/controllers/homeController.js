const Product = require("../models/product");

exports.getHomePage=async(req,res,next)=>{
    try{
        console.log("i am home");
        const allProducts=await Product.find();
        res.status(201).json(allProducts);
    }catch(err){
        console.log("error while fetching all products",err);
    }
};