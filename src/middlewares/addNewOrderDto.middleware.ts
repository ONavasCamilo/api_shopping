import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { addNewOrderDto } from "../dto/addNewOrder.dto";

const addNewOrderDtoMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, products } = req.body;

  const valid = new addNewOrderDto();
  valid.userId = userId;
  valid.products = products;

  validate(valid).then((err) => {
    if (err.length > 0) {
      return res.status(400).json({ error: err });
    } else {
      return next();
    }
  });
};

export default addNewOrderDtoMiddleware;
