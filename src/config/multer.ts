
import multer from "multer"
import path from 'path'
import crypto from 'crypto-js/sha256';


const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')
console.log("Entro aki");


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, tmpFolder);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() +  "-" + file.originalname);
  }
});

const uploads = multer({
    storage
})


export default uploads;

  
