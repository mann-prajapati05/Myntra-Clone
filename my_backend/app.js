require('dotenv').config()
const jwt=require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const express=require('express');
const cors = require("cors");

const { default: mongoose } = require('mongoose');
const homeRouter = require('./routes/homeRouter');
const adminRouter = require('./routes/adminRouter');
const bagRouter = require('./routes/bagRouter');
const authRouter = require('./routes/authRouter');

//const DBpath = "mongodb+srv://mann:Password@airbnb.unu77r4.mongodb.net/myntra?appName=airBnb";
const DBpath=process.env.MONGO_STR;
const secret="bro,icannottellthis!!";

const  app=express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

app.get('/',(req,res,next)=>{
    console.log(req.url,req.method);
    next();
});

app.use(authRouter);

app.use((req,res,next)=>{
    console.log("my cookies : ", req.cookies);
    if(req.cookies.uid){
        jwt.verify(req.cookies.uid,secret);
        next();
    }
    else return res.json({message:"Login first.."});
})

app.use(homeRouter);
app.use('/admin',adminRouter);
app.use('/bag',bagRouter);

const PORT=3030;
mongoose.connect(DBpath).then(()=>{
    console.log("connecting to mongo..");
    app.listen(PORT,()=>{
        console.log(`running server at http://localhost:${PORT}`);
    });
}).catch(err=>{
    console.log("error while connection mongo..",err);
});