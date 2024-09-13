import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import UpdateProductDto from "../dto/updateProduct.dto";

const updateProductDtoMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, price, stock, imgUrl } = req.body;

  const valid = new UpdateProductDto();
  valid.name = name;
  valid.price = price;
  valid.stock = stock;
  valid.imgUrl = imgUrl;

  validate(valid).then((err) => {
    if (err.length > 0) {
      return res.status(400).json({ error: err });
    } else {
      return next();
    }
  });
};

export default updateProductDtoMiddleware;