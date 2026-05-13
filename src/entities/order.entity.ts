import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { User } from "./user.entity";
import { OrderDetail } from "./order-detail.entity";

export enum OrderStatus {
    PENDING = "pendiente",
    PAID = "pagado",
    CANCELLED = "cancelado"
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => User, user => user.orders)
    user!: User;

    @Column({
        type: "enum",
        enum: OrderStatus,
        default: OrderStatus.PENDING
    })
    status!: OrderStatus;

    @Column({
        type: "decimal",
        precision: 12,
        scale: 2,
        nullable: true
    })
    total!: number;

    @OneToMany(() => OrderDetail, orderDetail => orderDetail.order)
    orderDetails!: OrderDetail[];
}