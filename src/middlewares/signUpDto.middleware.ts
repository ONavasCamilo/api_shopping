import { NextFunction, Request, Response } from "express";
import { ValidationError, validate } from "class-validator";
import SignUpDto from "../dto/signUp.dto";

const signUpDtoMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, address, phone, password, confirmpassword } = req.body;

  const valid = new SignUpDto();
  valid.name = name;
  valid.email = email;
  valid.address = address;
  valid.phone = phone;
  valid.password = password;
  valid.confirmpassword = confirmpassword;

  validate(valid).then((err) => {
    if (valid.password !== valid.confirmpassword) {
      const newError: ValidationError = {
        target: {
          name,
          email,
          address,
          phone,
          password,
          confirmpassword,
        },
        value: password,
        property: "password",
        constraints: {
          matchPassword: "La contraseña y la confirmación no coinciden",
        },
      };
      err.push(newError);
    }
    if (err.length > 0) {
      return res.status(400).json({ error: err });
    } else {
      return next();
    }
  });
};

export default signUpDtoMiddleware;
