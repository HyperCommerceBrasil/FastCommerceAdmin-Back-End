import multer from "multer"
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import path from 'path'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')
const MAX_SIZE_TWO_MEGABYTES = 2 * 1024 * 1024;


const storageTypes = {
  local: multer.diskStorage({
    destination: function(req, file, cb) {
    cb(null, tmpFolder);
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() +  "-" + file.originalname);
    }
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.BUCKET_NAME || '',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    
    acl: "public-read",
    
    key: (req, file, cb) => {
        cb(null, Date.now() +  "-" + file.originalname);
      
    },
  }),
};

const storageTypeLocal = process.env.STORAGE_TYPE || "local"


export default {
  dest: tmpFolder,
  storage: storageTypes[storageTypeLocal === "s3" ?  "s3" : "local"],
   limits: {
    fileSize: MAX_SIZE_TWO_MEGABYTES,
  },
};


  
