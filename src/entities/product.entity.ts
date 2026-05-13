import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Category } from "./category.entity";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: "varchar",
        length: 20,
        nullable: false
    })
    name!: string;

    @Column({
        type: "decimal",
        precision: 12,
        scale: 2,
        nullable: false
    })
    price!: number;

    @Column({
        type: "int",
        default: 0
    })
    stock!: number;

    @ManyToOne(() => Category)
    category!: Category;
}