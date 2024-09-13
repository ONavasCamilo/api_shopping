import { DataSource } from "typeorm";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME, RESTART_SCHEMA } from "./env.config";
import { User } from "../entities/user.entity";
import { Order } from "../entities/order.entity";
import { OrderDetail } from "../entities/orderDetail.entity";
import { Product } from "../entities/product.entity";
import { Category } from "../entities/category.entity";
import { Role } from "../entities/role.entity";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    port: DB_PORT as unknown as number,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    logging: false,
    entities: [User, Order, OrderDetail, Product, Category, Role],
    synchronize: true,
    dropSchema: RESTART_SCHEMA,
})