import { AppDataSource } from "../config/typeorm.config";
import { OrderDetail } from "../entities/orderDetail.entity";

const OrderDetailModel = AppDataSource.getRepository(OrderDetail);

export default OrderDetailModel;
