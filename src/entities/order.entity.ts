import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { OrderDetail } from "./orderDetail.entity";

@Entity({
    name: "orders",
})
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    date: Date;

    @OneToOne(() => OrderDetail, (orderDetails) => orderDetails.order)
    orderDetails: OrderDetail;

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: "user_id" })
    user: User;
}