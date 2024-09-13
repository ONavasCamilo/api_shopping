import { RoleEnum } from "./../interfaces/role.enum";
import { Role } from "../entities/role.entity";

const INITIAL_ROLES = [RoleEnum.ADMIN, RoleEnum.USER];

export const seedRoles = () => {
  const rolesPromises = INITIAL_ROLES.map((role) => Role.insert({ role }));
  return rolesPromises;
};
