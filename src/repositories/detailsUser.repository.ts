import { AppDataSource } from "../config/typeorm.config";
import { DetailUser } from "../entities/detailsUser.entity";

const DetailsUserModel = AppDataSource.getRepository(DetailUser);

export default DetailsUserModel;
