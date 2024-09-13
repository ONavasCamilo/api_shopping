import { Router } from "express";
import {
  signInController,
  signUpController,
} from "../controllers/auth.controller";
import signUpDtoMiddleware from "../middlewares/signUpDto.middleware";

const authRouter = Router();

authRouter.post("/signup", [signUpDtoMiddleware], signUpController);

authRouter.post("/signin", signInController);

export default authRouter;
