import { Router, Request, Response } from "express";
import { CategoryController } from "../controllers/category.controller";
import { CategoryService } from "../services/category.service";

const categoryRouter = Router();

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService);

categoryRouter.get("/categories", (req: Request, res: Response) => categoryController.getAllCategories(req, res));

categoryRouter.get("/categories/:id", (req: Request, res: Response) => categoryController.getCategoryById(req, res));

categoryRouter.post("/categories", (req: Request, res: Response) => categoryController.createCategory(req, res));

categoryRouter.put("/categories/:id", (req: Request, res: Response) => categoryController.updateCategory(req, res));

categoryRouter.delete("/categories/:id", (req: Request, res: Response) => categoryController.deleteCategory(req, res));

export default categoryRouter;
