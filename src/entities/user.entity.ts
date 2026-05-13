import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: false
    })
    name!: string;

    @Column({
        type: "varchar",
        length: 25,
        unique: true,
        nullable: false
    })
    email!: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false
    })
    password!: string;

    @OneToMany(() => Order, order => order.user)
    orders!: Order[];
}