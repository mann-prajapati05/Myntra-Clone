const User=require('../models/user');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const { check, validationResult } = require('express-validator');

const secret=process.env.JWT_SECRET;

exports.postSignup = [
    check('firstName')
        .trim()
        .notEmpty().withMessage('First name is required')
        .isLength({ min: 2 }).withMessage('First name must be at least 2 characters'),
    check('lastName')
        .trim()
        .notEmpty().withMessage('Last name is required')
        .isLength({ min: 2 }).withMessage('Last name must be at least 2 characters'),
    check('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email address')
        .normalizeEmail(),
    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    check('gender')
        .isIn(['male','female','other']).withMessage('Gender must be male, female or other'),
    async (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({ errors: errors.array() });
        }

        console.log("i am inside signIn",req.body);
        const {firstName,lastName,email,password,gender}=req.body;
        const bagItems=[];
        const userType="customer";

        // check if email already exists
        const existing = await User.findOne({ email: email });
        if(existing){
            return res.status(409).json({ message: 'Email already registered' });
        }

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
];

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

