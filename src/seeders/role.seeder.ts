import { RoleEnum } from "./../interfaces/role.enum";
import { Role } from "../entities/role.entity";
import { InsertResult } from "typeorm";

const INITIAL_ROLES = [RoleEnum.ADMIN, RoleEnum.USER];

export const seedRoles = (): Promise<InsertResult>[] => {
  const rolesPromises = INITIAL_ROLES.map((role) => Role.insert({ role }));
  return rolesPromises;
};
