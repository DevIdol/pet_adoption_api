import multer from "multer";

//set storage
let storage=multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,"uploads")
  },
  filename: (req, file, cb) => {
    // image.jpg => .jpg
    let ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    cb(null, file.fieldname + "-" + Date.now() + ext);
  }
   
})
export const store = multer({ storage: storage })
