import { Request, Response } from 'express';
import CategoryService from '../services/category.service';

class CategoryController {
    public async createCategory(req: Request, res: Response): Promise<void> {
        await CategoryService.createCategory(req.body).catch(Error)
        {
            res.status(201).json({Error});
        }
    }

    public async getCategories(req: Request, res: Response): Promise<void> {
        try {
            const categories = await CategoryService.getCategories();
            res.status(200).json(categories);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async getCategoryById(req: Request, res: Response): Promise<void> {
        try {
            const category = await CategoryService.getCategoryById(req.params.id);
            if (!category) {
                res.status(404).json({ message: 'Category not found' });
            } else {
                res.status(200).json(category);
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async updateCategory(req: Request, res: Response): Promise<void> {
        try {
            const category = await CategoryService.updateCategory(req.params.id, req.body);
            if (!category) {
                res.status(404).json({ message: 'Category not found '});
            } else {
                res.status(200).json(category);
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async deleteCategory(req: Request, res: Response): Promise<void> {
        try {
            const category = await CategoryService.deleteCategory(req.params.id);
            if (!category) {
                res.status(404).json({ message: 'Category not found '});
            } else {
                res.status(200).json(category);
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new CategoryController();