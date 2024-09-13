import { Router } from "express";
import { getCategoriesController, postCreateCategorieController } from "../controllers/categories.controller";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";

const categoriesRouter = Router();

categoriesRouter.get("/list", getCategoriesController);

categoriesRouter.post("/create", [verifyToken, isAdmin], postCreateCategorieController);

export default categoriesRouter;
