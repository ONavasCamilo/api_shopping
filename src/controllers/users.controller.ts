import { Request, Response } from "express";
import {
  deleteUserService,
  getAllUsersService,
  getOneUserService,
  postAddDetailsUserService,
  updateDetailsUserService,
  updatePasswordUserService,
  updateUserServices,
} from "../services/users.services";

export const getAllUsersController = async (req: Request, res: Response) => {
  const limit = req.query.limit
    ? parseInt(req.query.limit as string, 10)
    : undefined;
  const offset = req.query.offset
    ? parseInt(req.query.offset as string, 10)
    : undefined;
  const name = req.query.name as string;
  const email = req.query.email as string;
  try {
    const users = await getAllUsersService({ limit, offset, name, email });
    res.status(200).json(users);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};

export const getOneUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await getOneUserService(id);
    res.status(200).json(user);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};

export const postAddDetailsUserController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const {
    detailsName,
    detailsLastname,
    address,
    postalCode,
    location,
    country,
    phone,
  } = req.body;
  try {
    const userWithDetails = await postAddDetailsUserService(id, {
      detailsName,
      detailsLastname,
      address,
      postalCode,
      location,
      country,
      phone,
    });
    res.status(202).json(userWithDetails);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};

export const updateDetailsUserController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const {
    detailsName,
    detailsLastname,
    address,
    postalCode,
    location,
    country,
    phone,
  } = req.body;
  try {
    if (
      !detailsName &&
      !detailsLastname &&
      !address &&
      !postalCode &&
      !location &&
      !country &&
      !phone
    )
      throw new Error(
        "Ingresa detailsName, detailsLastname, address, postalcode, location, country o phone por actualizar"
      );
    const updateDetailsUser = await updateDetailsUserService(id, {
      detailsName,
      detailsLastname,
      address,
      postalCode,
      location,
      country,
      phone,
    });
    res.status(200).json(updateDetailsUser);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, lastname } = req.body;
  try {
    if (!name && !email && !lastname)
      throw new Error("Ingresa name, email, address o phone a actualizar");
    const updateUser = await updateUserServices(id, {
      name,
      email,
      lastname,
    });
    res.status(200).json(updateUser);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};

export const updatePasswordUserController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const { oldPassword, password, confirmpassword } = req.body;
  try {
    const updatePasswordUser = await updatePasswordUserService(id, {
      oldPassword,
      password,
      confirmpassword,
    });
    res.status(200).json(updatePasswordUser);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleteUser = await deleteUserService(id);
    res.status(200).json(deleteUser);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};
