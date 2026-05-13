import { Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";

const userRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRouter.get("/users", (req: Request, res: Response) => userController.getAllUsers(req, res)); //http://localhost:3000/users

userRouter.get("/users/:id", (req: Request, res: Response) => userController.getUserById(req, res)); 

userRouter.post("/users", (req: Request, res: Response) => userController.createUser(req, res)); // http://localhost:3000/api/users

userRouter.put("/users/:id", (req: Request, res: Response) => userController.updateUser(req, res)); // 

userRouter.delete("/users/:id", (req: Request, res: Response) => userController.deleteUser(req, res)); // 

export default userRouter; 