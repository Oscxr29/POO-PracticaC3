import { Category } from "../entities/category.entity";
import { Database } from "../database/db";
import { ICategory } from "../interfaces/category.interface";

export class CategoryService {
    private database = Database.getInstance();
    private categoryRepository = this.database.getDataSource().getRepository(Category);

    async getAllCategories() {
        return await this.categoryRepository.find();
    }

    async getCategoryById(id: number) {
        return await this.categoryRepository.findOneBy({ id });
    }

    async createCategory(category: ICategory) {
        if (!category.name || category.name.trim().length === 0) {
            throw new Error("El nombre de la categoría es requerido");
        }

        if (category.name.length > 15) {
            throw new Error("El nombre no debe exceder 15 caracteres");
        }

        const newCategory = new Category();
        newCategory.name = category.name;

        return await this.categoryRepository.save(newCategory);
    }

    async updateCategory(id: number, category: ICategory) {
        const existing = await this.getCategoryById(id);
        if (!existing) throw new Error("Categoría no encontrada");

        if (category.name) {
            if (category.name.length > 15) {
                throw new Error("El nombre no debe exceder 15 caracteres");
            }
            existing.name = category.name;
        }

        return await this.categoryRepository.save(existing);
    }

    async deleteCategory(id: number) {
        const existing = await this.getCategoryById(id);
        if (!existing) throw new Error("Categoría no encontrada");

        await this.categoryRepository.remove(existing);
        return { message: "Categoría eliminada" };
    }
}
