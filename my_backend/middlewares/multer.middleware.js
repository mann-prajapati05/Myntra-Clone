//const multer=require('multer');
import multer from 'multer';

const storage = multer.diskStorage({  //act as a middleware 
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

export const upload = multer({storage});