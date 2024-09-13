import { AppDataSource } from "../config/typeorm.config";
import { Role } from "../entities/role.entity";
import { User } from "../entities/user.entity";
import { RoleEnum } from "../interfaces/role.enum";

const RoleModel = AppDataSource.getRepository(Role).extend({
    async asignRole(user: User) {
      const role = await RoleModel.findOneBy({ role: RoleEnum.ADMIN });
      if (!role) throw new Error("Error encontrando role");
      user.role = role;
      return user;
    },
  });
  
  export default RoleModel;