import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({
  name: "detailsusers",
})
export class DetailUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 30,
    nullable: false,
  })
  detailsName: string;

  @Column({
    type: "varchar",
    length: 50,
    nullable: false,
  })
  detailsLastname: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  address: string;

  @Column({
    nullable: false,
  })
  postalCode: number;

  @Column({
    type: "varchar",
    length: 30,
    nullable: false,
  })
  location: string;

  @Column({
    type: "varchar",
    length: 30,
    nullable: false,
  })
  country: string;

  @Column({
    nullable: false,
  })
  phone: number;

  @OneToOne(() => User, (user) => user.detailUser)
  user: User;
}
