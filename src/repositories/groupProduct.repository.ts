import { AppDataSource } from "../config/typeorm.config";
import { GroupProducts } from "../entities/groupProduct.entity";

const GroupProductModel = AppDataSource.getRepository(GroupProducts);

export default GroupProductModel;