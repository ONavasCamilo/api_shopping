import { Router } from "express";
import {
  deleteProductController,
  getAllProductsController,
  getOneProductsController,
  postCreateProductController,
  putUpdateImageController,
  updateProductController,
} from "../controllers/products.controller";
import updateProductDtoMiddleware from "../middlewares/updateProductDto.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import CreateProductDtoMiddleware from "../middlewares/createProductDto.middleware";
import uploadMulter from "../config/cloudinary.config";

const productsRouter = Router();

productsRouter.get("/list", getAllProductsController);

productsRouter.get("/one/:id", getOneProductsController);

productsRouter.put(
  "/update/:id",
  [updateProductDtoMiddleware, verifyToken, isAdmin],
  updateProductController
);

productsRouter.post(
  "/create",
  uploadMulter.single("file"),
  [CreateProductDtoMiddleware, verifyToken, isAdmin],
  postCreateProductController
);

productsRouter.put(
  "/update-image/:id",
  uploadMulter.single("file"),
  [verifyToken, isAdmin],
  putUpdateImageController
);

productsRouter.delete(
  "/delete/:id",
  [verifyToken, isAdmin],
  deleteProductController
);

export default productsRouter;
