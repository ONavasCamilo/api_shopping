import { Request, Response } from "express";
import { filesUploadImageService } from "../services/files.services";

export const filesUploadImageController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { file } = req;
  try {
    if (!file) throw new Error("Archivo sin enviar")
    const response = await filesUploadImageService(id, file);
    res.status(202).json(response);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};
