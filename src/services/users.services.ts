import { CreateDetailUserDto, UpdateDetailUserDto } from "../dto/detailsUser.dto";
import { FiltersUsersDto } from "../dto/filtersUsers.dto";
import updatePasswordUserDto from "../dto/updatePasswordUser.dto";
import UpdateUserDto from "../dto/updateUser.dto";
import { DetailUser } from "../entities/detailsUser.entity";
import DetailsUserModel from "../repositories/detailsUser.repository";
import OrderModel from "../repositories/order.repository";
import UserModel from "../repositories/user.repository";
import { comparePassword, hashPassword } from "../utils/passwordManager.utils";

export const getAllUsersService = async (params: FiltersUsersDto) => {
  const { limit, offset, name, email } = params;

  return await UserModel.find({
    where: {
      name: name || undefined,
      email: email || undefined,
      isActive: true,
    },
    relations: {
      role: true,
      orders: true,
      detailUser: true,
    },
    take: limit,
    skip: offset,
  });
};

export const getOneUserService = async (id: string) => {
  const userById = await UserModel.findOne({
    where: { id, isActive: true },
    relations: ["role", "orders", "detailsUser"],
  });
  if (!userById) throw new Error("Usuario inexistente");
  return userById;
};

export const postAddDetailsUserService = async (
  id: string,
  userDetails: CreateDetailUserDto
) => {
  const userById = await UserModel.findOne({
    where: { id, isActive: true },
    relations: ["role", "orders", "detailUser"],
  });
  if (!userById) throw new Error("Usuario no encontrado");

  if (userById.detailUser) {
    throw new Error("Los detalles del usuario ya existen");
  }

  const newDetailsUser = new DetailUser();
  newDetailsUser.user = userById;
  newDetailsUser.detailsName = userDetails.detailsName;
  newDetailsUser.detailsLastname = userDetails.detailsLastname;
  newDetailsUser.address = userDetails.address;
  newDetailsUser.postalCode = userDetails.postalCode;
  newDetailsUser.location = userDetails.location;
  newDetailsUser.country = userDetails.country;
  newDetailsUser.phone = userDetails.phone;

  await DetailsUserModel.save(newDetailsUser);
  return await UserModel.findOne({
    where: { id, isActive: true },
    relations: ["role", "orders", "detailUser"],
  });
};

export const updateDetailsUserService = async (
  id: string,
  userDetails: UpdateDetailUserDto
) => {
  const userById = await UserModel.findOne({
    where: { id, isActive: true, },
    relations: ["role", "orders", "detailUser"],
  })
  if (!userById) throw new Error("Usuario no encontrado");
  if (!userById.detailUser) {
    throw new Error("Los detalles del usuario no existen");
  }
  await DetailsUserModel.update(userById.detailUser.id, userDetails);
  const userUpdateDetails = await UserModel.findOne({
    where: { id, isActive: true, },
    relations: ["role", "orders", "detailUser"],
  })
  return userUpdateDetails;
};

export const updateUserServices = async (
  id: string,
  updateBody: UpdateUserDto
) => {
  const existUser = await UserModel.findOne({ where: { id, isActive: true } });
  if (!existUser) throw new Error("Usuario inexistente");
  await UserModel.update(id, updateBody);
  const updateUser = await UserModel.findOne({
    where: { id },
    relations: {
      role: true,
      orders: true,
    },
  });
  return updateUser;
};

export const updatePasswordUserService = async (
  id: string,
  updatePasswordBody: updatePasswordUserDto
) => {
  const existUser = await UserModel.findOne({
    where: { id, isActive: true },
    select: ["id", "password"],
  });
  if (!existUser) throw new Error("Usuario inexistente");

  const oldSamePassword = await comparePassword(
    updatePasswordBody.oldpassword,
    existUser.password
  )
  if(!oldSamePassword) throw new Error("Contraseña anterior no coincide")

  const samePassword = await comparePassword(
    updatePasswordBody.password,
    existUser.password
  );
  if (samePassword)
    throw new Error("Contraseña debe ser diferente a la actual");

  const hashedPassword = await hashPassword(updatePasswordBody.password);
  existUser.password = hashedPassword;
  await UserModel.save(existUser);
  return {
    message: "Contraseña de usuario actualizada",
  };
};

export const deleteUserService = async (id: string) => {
  const existUser = await UserModel.findOne({
    where: { id, isActive: true },
    relations: ["orders"],
  });
  if (!existUser) throw new Error("Usuario inexistente");
  existUser.isActive = false;
  await UserModel.save(existUser);
  return {
    message: "Usuario eliminado correctamente",
  };
};
