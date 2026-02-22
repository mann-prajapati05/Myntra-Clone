const Product = require("../models/product");
const { ObjectId } = require('mongodb');
const { uploadOnCloudinary } = require("../utils/cloudinary");

exports.postAddProduct=async(req,res,next)=>{
    
    try{
        console.log("inside post add-product..");
        console.log(req.body);
        const {title,description,rating,reviewNumbers,actualPrice,MRP,discounts}=req.body;
        if(!req.file){
            console.log("trigger err in req.file..");
            return res.status(401).json({message:"error while uploading image"});
        }
        console.log(req.file);
        const photo=req.file;

        const cloudinaryResult= await uploadOnCloudinary(photo.path);

        if(!cloudinaryResult){
            return res.status(500).json({message:"cloudinary upload failed.."});
        }

        const product=new Product({photo:cloudinaryResult.secure_url,title,description,rating,reviewNumbers,actualPrice,MRP,discounts});
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
exports.putModifyProduct= async(req,res,next)=>{
    try{
        const {title,description,rating,reviewNumbers,actualPrice,MRP,discounts}=req.body;
        const pid=req.params.productId;
        
        const product=await Product.findById(pid);
        
        if (req.file) {
            const cloudinaryResult = await uploadOnCloudinary(req.file.path);
            if (!cloudinaryResult) {
                return res.status(500).json({ message: "Cloudinary upload failed" });
            }
            product.photo = cloudinaryResult.secure_url;
        }

        product.title=title;
        product.description=description;
        product.rating=rating;
        product.reviewNumbers=reviewNumbers;
        product.actualPrice=actualPrice;
        product.MRP=MRP;
        product.discounts=discounts;
        const updated_product=await product.save();
        console.log("Product details updated!!");
        res.status(201).json(updated_product);
    }catch(err){
        console.log("something went wrong ! while modify product!!",err);
    }
}
exports.getProduct= async(req,res,next)=>{
    try{
        const pid=req.params.productId;
        console.log(pid);
        const product=await Product.findById(pid);
        console.log(product);
        res.status(200).json(product);
    }catch(err){
        console.log("something went wrong ! while getting product!!",err);
    }
}

