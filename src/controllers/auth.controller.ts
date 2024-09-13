import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { signInService, signUpService } from "../services/auth.services";
import { JWT_SECRET } from "../config/env.config";

export const signUpController = async (req: Request, res: Response) => {
  const { name, email, address, phone, password, confirmpassword } = req.body;
  try {
    const newUser = await signUpService({
      name,
      email,
      address,
      phone,
      password,
      confirmpassword
    });
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, JWT_SECRET, { expiresIn: "1d" });
    return res.status(202).json({
      token,
      newUser,
    });
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};

export const signInController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await signInService(email, password);
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
    return res.status(200).json({
      token,
      user,
    });
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};
