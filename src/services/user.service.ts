import { User } from "../entities/user.entity";
import { Database } from "../database/db";
import { IUser } from "../interfaces/user.interface";
import bcrypt from "bcrypt";

export class UserService {
    private database = Database.getInstance();
    private userRepository = this.database.getDataSource().getRepository(User);

    async getAllUsers() {
        const users = await this.userRepository.find();
        return users.map(u => {
            const { password, ...rest } = u as any;
            return rest;
        });
    }

    async getUserById(id: string) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) return null;
        const { password, ...rest } = user as any;
        return rest;
    }

    async createUser(user: IUser) {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(user.email)) {
            throw new Error("Email inválido");
        }

        if (!user.password || user.password.length < 6) {
            throw new Error("La contraseña debe tener al menos 6 caracteres");
        }

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(user.password, salt);

        const newUser = new User();
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.password = hashed;

        const saved = await this.userRepository.save(newUser);
        const { password, ...rest } = saved as any;
        return rest;
    }

    async updateUser(id: string, user: IUser) {
        const existing = await this.userRepository.findOneBy({ id });
        if (!existing) throw new Error("Usuario no encontrado");

        if (user.name) existing.name = user.name;
        if (user.email) existing.email = user.email;
        if (user.password) {
            const salt = await bcrypt.genSalt(10);
            existing.password = await bcrypt.hash(user.password, salt);
        }

        const saved = await this.userRepository.save(existing);
        const { password, ...rest } = saved as any;
        return rest;
    }

    async deleteUser(id: string) {
        const existing = await this.userRepository.findOneBy({ id });
        if (!existing) throw new Error("Usuario no encontrado");

        await this.userRepository.remove(existing);
        return { message: "Usuario eliminado" };
    }
}
