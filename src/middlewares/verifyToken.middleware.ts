import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config";
import { Payload, SessionRequest } from "../interfaces/payload.interface";

export const verifyToken = (
  req: SessionRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1] ?? "";
  if (!token) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "Token sin ingresar" });
  }
  try {
    const decodedPayload = jwt.verify(token, JWT_SECRET) as Payload;
    req.session = decodedPayload;
    next();
  } catch (err) {
    return res.status(400).json({ statusCode: 400, message: "Token inválido" });
  }
};