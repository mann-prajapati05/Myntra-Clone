const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

exports.uploadOnCloudinary= async(localFilePath)=>{
    try{

    if(!localFilePath) return null;
        const result=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        console.log("file is uploaded on cloudinary..",result.url);
        return result;

    }catch(err){
        fs.unlinkSync(localFilePath);
    }  
}

