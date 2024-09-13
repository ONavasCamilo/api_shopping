import { AppDataSource } from "../config/typeorm.config";
import { User } from "../entities/user.entity";

const UserModel = AppDataSource.getRepository(User);

export default UserModel;
