const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:String,
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    userType:{
        type:String,
        enum:['customer','admin'],
        required:true,
    },
    bagItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }],
});

module.exports=mongoose.model('User',userSchema);