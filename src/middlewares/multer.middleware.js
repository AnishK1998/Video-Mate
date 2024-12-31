import multer from "multer";

//there are two ways to store upload files via multer:- 1> diskStorage 2> memoryStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/temp");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});


export const upload = multer({
    storage
})