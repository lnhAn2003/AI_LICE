import Category, { ICategory } from '../models/category.model';

class CategoryService {
    public async createCategory(categoryData: ICategory): Promise<ICategory> {
        const category = new Category(categoryData);
        return await category.save();
    }

    public async getCategories(): Promise<ICategory[]> {
        return await Category.find().populate('parentCategory', 'name');
    }

    public async getCategoryById(id: string): Promise<ICategory | null> {
        return await Category.findById(id).populate('parentCategory', 'name');
    }

    public async updateCategory(id: string, updateData: Partial<ICategory>): Promise<ICategory | null> {
        return await Category.findByIdAndUpdate(id, updateData, { new: true });
    }

    public async deleteCategory(id: string): Promise<ICategory | null> {
        return await Category.findByIdAndDelete(id);
    }
}

export default new CategoryService();