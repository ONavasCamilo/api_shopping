import { Request, Response } from "express";
import {
  addNewOrdersService,
  getAllOrdersService,
  getOneOrdersService,
} from "../services/orders.services";

export const getAllOrdersController = async (req: Request, res: Response) => {
  try {
    const orders = await getAllOrdersService();
    res.status(200).json(orders);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};

export const getOneOrdersController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const order = await getOneOrdersService(id);
    res.status(200).json(order);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};

export const addNewOrdersController = async (req: Request, res: Response) => {
  const { userId, products } = req.body;
  try {
    const newOrder = await addNewOrdersService({ userId, products });
    res.status(200).json(newOrder);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};
