import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@Entity({
    name: "orderDetails",
})
export class OrderDetail {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "decimal",
        precision: 10,
        scale: 2
    })
    price: number;

    @OneToOne(() => Order, (order) => order.orderDetails)
    @JoinColumn({ name: "order_id" })
    order: Order;

    @ManyToMany(() => Product)
    @JoinTable({
      name: 'ORDERDETAILS_PRODUCTS',
      joinColumn: {
        name: 'product_id',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'orderdetail_id',
        referencedColumnName: 'id',
      },
    })
    products: Product[];
}