import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderDetail } from "./orderDetail.entity";
import { Category } from "./category.entity";

@Entity({
    name: "products",
})
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false,
      })
    name: string;
    
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
      })
    price: number;

    @Column({
        type: 'int',
        nullable: false, 
      })
    stock: number;

    @Column({
        type: 'text',
        default: 'https://defaultImg.com',
      })
    imgUrl: string;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @ManyToMany(() => OrderDetail, (orderDetails) => orderDetails.products)
    orderDetails: OrderDetail;
}