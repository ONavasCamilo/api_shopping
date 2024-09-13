import { AppDataSource } from "../config/typeorm.config";
import { Category } from "../entities/category.entity";

const CategoryModel = AppDataSource.getRepository(Category);

export default CategoryModel;