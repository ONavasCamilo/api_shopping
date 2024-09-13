import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "./env.config";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const uploadMulter = multer({
  storage,
  limits: { fileSize: 200000 }, // 200kb
  fileFilter: (req, file, cb) => {
    const filetypes = /jpg|jpeg|png|webp|svg|gif/;
    const mimetype = filetypes.test(file.mimetype);
    let extname = false;
    if (file.originalname) {
      const extension = file.originalname.split(".").pop()?.toLowerCase();
      if (extension) {
        extname = filetypes.test(extension);
      }
    }

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Tipo de archivo no soportado"));
    }
  },
});

export default uploadMulter;
