import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { IUser } from "../interfaces/user.interface";

export class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json({
                status: 200,
                data: users,
                message: "Usuarios obtenidos correctamente"
            });
        } catch (error: any) {
            res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (!id || Array.isArray(id)) {
                return res.status(400).json({ status: 400, message: "ID inválido" });
            }
            const user = await this.userService.getUserById(id);

            if (!user) {
                return res.status(404).json({
                    status: 404,
                    message: "Usuario no encontrado"
                });
            }

            res.status(200).json({
                status: 200,
                data: user,
                message: "Usuario obtenido correctamente"
            });
        } catch (error: any) {
            res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const user: IUser = req.body;
            const newUser = await this.userService.createUser(user);

            res.status(201).json({
                status: 201,
                data: newUser,
                message: "Usuario creado correctamente"
            });
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message
            });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (!id || Array.isArray(id)) {
                return res.status(400).json({ status: 400, message: "ID inválido" });
            }
            const user: IUser = req.body;
            const updatedUser = await this.userService.updateUser(id, user);

            res.status(200).json({
                status: 200,
                data: updatedUser,
                message: "Usuario actualizado correctamente"
            });
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message
            });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            if (!id || Array.isArray(id)) {
                return res.status(400).json({ status: 400, message: "ID inválido" });
            }
            await this.userService.deleteUser(id);

            res.status(200).json({
                status: 200,
                message: "Usuario eliminado correctamente"
            });
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message
            });
        }
    }
}