import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import CreateProductDto from "../dto/createProduct.dto";
import { plainToClass } from "class-transformer";

const CreateProductDtoMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, price, stock, category } = req.body;

  const plainObject = {
    name,
    price: parseFloat(price),
    stock: parseInt(stock, 10),
    category,
  };

  const validTransform = plainToClass(CreateProductDto, plainObject);

  validate(validTransform).then((err) => {
    if (err.length > 0) {
      return res.status(400).json({ error: err });
    } else {
      return next();
    }
  });
};

export default CreateProductDtoMiddleware;