import util from 'util'
import multer from 'multer'
const maxSize = 90 * 1024 * 1024;
 
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,  './src/api/files');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

let uploadTempFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

export const  uploadFileMiddleware = util.promisify(uploadTempFile);
