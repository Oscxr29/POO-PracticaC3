import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/user.entity";

dotenv.config();

export class Database {
    private static instance?: Database;
    private readonly typeormDataSource: DataSource;
    private readonly host: string;
    private readonly port: number;
    private readonly username: string;
    private readonly password: string;
    private readonly database: string;

    private constructor() {
        this.host = process.env.DB_HOST || "localhost";
        this.port = parseInt(process.env.DB_PORT || "5432");
        this.username = process.env.DB_USERNAME || "postgres";
        this.password = process.env.DB_PASSWORD || "postgres";
        this.database = process.env.DB_NAME || "ecommerce";

        this.typeormDataSource = new DataSource({
            type: "postgres",
            host: this.host,
            port: this.port,
            username: this.username,
            password: this.password,
            database: this.database,
            entities: [User],
            synchronize: false,
        });
    }

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public getDataSource(): DataSource {
        return this.typeormDataSource;
    }

    public async initialize(): Promise<DataSource> {
        if (!this.typeormDataSource.isInitialized) {
            await this.typeormDataSource.initialize();
        }
        return this.typeormDataSource;
    }
}

export const AppDataSource = Database.getInstance().getDataSource();
export const initializeDatabase = async () => Database.getInstance().initialize();

