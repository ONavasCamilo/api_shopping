import { Router } from "express";
import { filesUploadImageController } from "../controllers/files.controller";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import uploadMulter from "../config/cloudinary.config";

const filesRouter = Router();

filesRouter.post(
  "/uploadImage/:id",
  uploadMulter.single("file"),
  [verifyToken, isAdmin] , filesUploadImageController
);

export default filesRouter;
