const User=require('../models/user');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const secret="bro,icannottellthis!!";

exports.postSignup=async(req,res,next)=>{
    console.log("i am inside signIn",req.body);
    const {firstName,lastName,email,password,gender}=req.body;
    const bagItems=[];
    const userType="customer";
    const hashedPassword=await bcrypt.hash(password,10);

    const user=new User({firstName,lastName,email,password:hashedPassword,gender,userType,bagItems});
    await user.save();
    const payload={
        _id:user._id,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        userType:user.userType,
    }
    const token=jwt.sign(payload,secret);
    res.cookie("uid",token);
    return res.status(200).json({ message: "register successful" });
}

exports.postLogin=async(req,res,next)=>{
    console.log("i am inside login..",req.body);
    const {email,password}=req.body;
    const user=await User.findOne({email:email});
    console.log(user);
    if(user){
        const match=await bcrypt.compare(password,user.password);
        if(match){
            const payload={
                _id:user._id,
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                userType:user.userType,
            }
            const token=jwt.sign(payload,secret);
            res.cookie("uid",token);
            return res.status(200).json({ userType:payload.userType });
        }
    }
    return res.json({message:"Invalid email or password.."});
}

exports.postLogout = (req,res,next) =>{
    res.clearCookie("uid");
    res.status(200).json({message:"Logout successfully.."});
}

exports.verifyUser =async(req,res,next)=>{
    try{
        console.log("checking for user auth..");
        const token=req.cookies.uid;
        if(!token){
            return res.status(401).json({message:"No token found"});
        }
        const decoded=jwt.verify(token,secret);
        console.log("checked auth seccessfully",decoded);
        res.status(200).json({userType:decoded.userType});
    }catch(err){
        return res.status(401).json({message:"Invalid token"});
    }
}

