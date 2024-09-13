import { AppDataSource } from "../config/typeorm.config";
import { Order } from "../entities/order.entity";

const OrderModel = AppDataSource.getRepository(Order)

export default OrderModel;