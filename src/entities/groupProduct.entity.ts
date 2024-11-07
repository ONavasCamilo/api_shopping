import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity({
    name: "groupProducts"
})
export class GroupProducts {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Product, (product) => product.groupProducts)
    products: Product[]
}