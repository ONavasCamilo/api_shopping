import { Request, Response } from "express";
import {
  createProductService,
  deleteProductService,
  getAllProductsService,
  getOneProductService,
  updateProductService,
} from "../services/products.services";

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const products = await getAllProductsService();
    res.status(200).json(products);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};

export const getOneProductsController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await getOneProductService(id);
    res.status(200).json(product);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};

export const updateProductController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;
  try {
    if (!name && !price && !stock)
      throw new Error(
        "Ingresa name, price o stock para actualizar"
      );
    const updateProduct = await updateProductService(id, {
      name,
      price,
      stock,
    });
    res.status(200).json(updateProduct);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};

export const postCreateProductController = async (
  req: Request,
  res: Response
) => {
  const { name, price, stock, category } = req.body;
  const { file } = req;
  try {
    if (!file) throw new Error("Archivo sin enviar")
    const newProduct = await createProductService({
      name,
      price,
      stock,
      category,
    }, file);
    res.status(202).json(newProduct);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};

export const deleteProductController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteProduct = await deleteProductService(id);
    res.status(200).json(deleteProduct);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};
