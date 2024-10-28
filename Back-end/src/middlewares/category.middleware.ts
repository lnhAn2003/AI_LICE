import { Request, Response, NextFunction } from 'express';
import Category from '../models/category.model';

export const checkDuplicateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { _id, name } = req.body;
    const categoryExists = await Category.findOne({ $or: [{ _id }, { name }] });
    if (categoryExists) {
        res.status(400).json({ message: 'Category with the same ID or name already exists.' });
    }
    next();
};
