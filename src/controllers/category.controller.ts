import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { ICategory } from "../interfaces/category.interface";

export class CategoryController {
    private categoryService: CategoryService;

    constructor(categoryService: CategoryService) {
        this.categoryService = categoryService;
    }

    async getAllCategories(req: Request, res: Response) {
        try {
            const categories = await this.categoryService.getAllCategories();
            res.status(200).json({
                status: 200,
                data: categories,
                message: "Categorías obtenidas correctamente"
            });
        } catch (error: any) {
            res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    }

    async getCategoryById(req: Request, res: Response) {
        try {
            const idParam = req.params.id;
            if (!idParam || Array.isArray(idParam)) {
                return res.status(400).json({ status: 400, message: "ID inválido" });
            }
            const id = parseInt(idParam);
            if (isNaN(id)) {
                return res.status(400).json({ status: 400, message: "ID inválido" });
            }
            const category = await this.categoryService.getCategoryById(id);

            if (!category) {
                return res.status(404).json({
                    status: 404,
                    message: "Categoría no encontrada"
                });
            }

            res.status(200).json({
                status: 200,
                data: category,
                message: "Categoría obtenida correctamente"
            });
        } catch (error: any) {
            res.status(500).json({
                status: 500,
                message: error.message
            });
        }
    }

    async createCategory(req: Request, res: Response) {
        try {
            const category: ICategory = req.body;
            const newCategory = await this.categoryService.createCategory(category);

            res.status(201).json({
                status: 201,
                data: newCategory,
                message: "Categoría creada correctamente"
            });
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message
            });
        }
    }

    async updateCategory(req: Request, res: Response) {
        try {
            const idParam = req.params.id;
            if (!idParam || Array.isArray(idParam)) {
                return res.status(400).json({ status: 400, message: "ID inválido" });
            }
            const id = parseInt(idParam);
            if (isNaN(id)) {
                return res.status(400).json({ status: 400, message: "ID inválido" });
            }
            const category: ICategory = req.body;
            const updatedCategory = await this.categoryService.updateCategory(id, category);

            res.status(200).json({
                status: 200,
                data: updatedCategory,
                message: "Categoría actualizada correctamente"
            });
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message
            });
        }
    }

    async deleteCategory(req: Request, res: Response) {
        try {
            const idParam = req.params.id;
            if (!idParam || Array.isArray(idParam)) {
                return res.status(400).json({ status: 400, message: "ID inválido" });
            }
            const id = parseInt(idParam);
            if (isNaN(id)) {
                return res.status(400).json({ status: 400, message: "ID inválido" });
            }
            await this.categoryService.deleteCategory(id);

            res.status(200).json({
                status: 200,
                message: "Categoría eliminada correctamente"
            });
        } catch (error: any) {
            res.status(400).json({
                status: 400,
                message: error.message
            });
        }
    }
}
