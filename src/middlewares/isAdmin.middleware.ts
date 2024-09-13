import { NextFunction, Request, Response } from "express";
import { SessionRequest } from "../interfaces/payload.interface";
import RoleModel from "../repositories/role.repository";
import { RoleEnum } from "../interfaces/role.enum";

export const isAdmin = async (
  req: SessionRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.session) {
    return res
      .status(400)
      .json({ statusCode: 404, message: "Sesión sin encontrar" });
  }
  if (!req.session.role) {
    return res
      .status(400)
      .json({ statusCode: 400, message: "Rol de la sesión no encontrado" });
  }
  try {
    const adminRol = await RoleModel.findOneBy({ role: RoleEnum.ADMIN });
    if (!adminRol) {
      return res.status(400).json({ statusCode: 500, message: "Error server" });
    }
    if (adminRol.id === Number(req.session.role.id)) return next();
    return res.status(400).json({ statusCode: 401, message: "Unauthorized" });
  } catch (err) {
    return res.status(400).json({ statusCode: 500, message: `${err} error` });
  }
};
