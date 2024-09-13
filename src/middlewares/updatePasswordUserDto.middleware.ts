import { NextFunction, Request, Response } from "express";
import { ValidationError, validate } from "class-validator";
import updatePasswordUserDto from "../dto/updatePasswordUser.dto";

const updatePasswordUserDtoMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, confirmpassword, name, email, address, phone } = req.body;

  const valid = new updatePasswordUserDto();
  valid.password = password;
  valid.confirmpassword = confirmpassword;
  valid.name = name;
  valid.email = email;
  valid.address = address;
  valid.phone = phone;

  validate(valid).then((err) => {
    if (valid.password !== valid.confirmpassword) {
      const newError: ValidationError = {
        target: {
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

export default updatePasswordUserDtoMiddleware;
