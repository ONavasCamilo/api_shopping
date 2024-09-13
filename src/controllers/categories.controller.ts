import { Request, Response } from "express";
import { getCategoriesService, postCreateCategorieService } from "../services/categories.services";

export const getCategoriesController = async (req: Request, res: Response) => {
  try {
    const categories = await getCategoriesService();
    res.status(200).json(categories);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};

export const postCreateCategorieController = async (
  req: Request,
  res: Response
) => {
  const { name } = req.body;
  try {
    const createCategory = await postCreateCategorieService(name);
    res.status(202).json(createCategory);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};
