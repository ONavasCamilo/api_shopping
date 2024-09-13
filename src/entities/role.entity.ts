import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({
    name: "roles",
})
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ unique: true })
    role: string;

    @OneToMany(() => User, (user) => user.role)
    user: User[]
}