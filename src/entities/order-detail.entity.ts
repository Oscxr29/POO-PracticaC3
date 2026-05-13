import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "./product.entity";

@Entity()
export class OrderDetail {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => Order, order => order.orderDetails)
    order!: Order;

    @ManyToOne(() => Product)
    product!: Product;

    @Column({
        type: "int",
        nullable: false
    })
    quantity!: number;

    @Column({
        type: "decimal",
        precision: 12,
        scale: 2,
        nullable: false
    })
    precio_unitario!: number;
}