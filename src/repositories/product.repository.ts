import { AppDataSource } from "../config/typeorm.config";
import { Product } from "../entities/product.entity";

const ProductModel = AppDataSource.getRepository(Product);

export default ProductModel;