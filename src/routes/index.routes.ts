import { Router } from "express";
import authRouter from "./auth.routes";
import usersRouter from "./users.routes";
import productsRouter from "./products.routes";
import categoriesRouter from "./categories.routes";
import ordersRouter from "./orders.routes";
import filesRouter from "./files.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/orders", ordersRouter);
router.use("/files", filesRouter);

export default router;
