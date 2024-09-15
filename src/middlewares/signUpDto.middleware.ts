import { NextFunction, Request, Response } from "express";
import { ValidationError, validate } from "class-validator";
import SignUpDto from "../dto/signUp.dto";

const signUpDtoMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, lastname, password } = req.body;

  const valid = new SignUpDto();
  valid.name = name;
  valid.email = email;
  valid.lastname = lastname;
  valid.password = password;

  validate(valid).then((err) => {
    if (err.length > 0) {
      return res.status(400).json({ error: err });
    } else {
      return next();
    }
  });
};

export default signUpDtoMiddleware;
