import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    nombre!: string;

    @Column()
    email!: string;
    
}