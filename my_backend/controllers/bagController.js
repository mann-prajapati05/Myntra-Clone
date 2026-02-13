const User=require('../models/user');
const jwt = require('jsonwebtoken');
const secret = "bro,icannottellthis!!";

exports.postAddtoBag =async(req,res,next)=>{
    try{
        console.log("add to bag clicked!!");
        const productId=req.params.productId;
        //const user=await User.findOne({email:"abc@gmail.com"}); //dummy find user - just to check 
        // api
        console.log(productId);
        const token=req.cookies.uid;
        const decoded=jwt.verify(token,secret);
        const user=await User.findById(decoded._id);
        if(!user.bagItems.includes(productId)){
            user.bagItems.push(productId);
            await user.save();
        }
        return res.status(201).json(productId);
    }catch(err){
        console.log("error while add to bag..",err);
    }
}

exports.getBag = async(req,res,next)=>{
    //const user=await User.findOne({email:"abc@gmail.com"}); //dummy find user - just to check api
    const token=req.cookies.uid;
    const decoded=jwt.verify(token,secret);

    const user=await User.findById(decoded._id);
    await user.populate('bagItems');
    res.status(201).json(user.bagItems);
}
exports.deleteFromBag = async(req,res,next)=>{
    const productId=req.params.productId;
    console.log("inside delete from bag..");
   //const user=await User.findOne({email:"abc@gmail.com"});  //dummy find user - just to check api
   const token=req.cookies.uid;
   const decoded=jwt.verify(token,secret);
   const user=await User.findById(decoded._id);
   console.log(user);
   if(user.bagItems.includes(productId)){
       user.bagItems=await user.bagItems.filter(pid=>pid.toString()!=productId.toString());
       await user.save();
   }
   return res.status(201).json({message:"removed from bag succesful"});
}

