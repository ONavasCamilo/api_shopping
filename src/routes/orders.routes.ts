import { Router } from "express";
import {
  addNewOrdersController,
  getAllOrdersController,
  getOneOrdersController,
} from "../controllers/orders.controller";
import addNewOrderDtoMiddleware from "../middlewares/addNewOrderDto.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";

const ordersRouter = Router();

ordersRouter.get("/list", [verifyToken, isAdmin], getAllOrdersController);

ordersRouter.get("/one/:id", [verifyToken], getOneOrdersController);

ordersRouter.post(
  "/add",
  [addNewOrderDtoMiddleware, verifyToken],
  addNewOrdersController
);

export default ordersRouter;
