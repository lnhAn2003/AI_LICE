import { Router } from "express";
import CategoryController from "../controllers/category.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { checkRoleAndPermission } from '../middlewares/role.middleware';
import { checkDuplicateCategory } from "../middlewares/category.middleware";

const router = Router();

// Create a new category (requires authentication, admin role, and permission to manage categories)
router.post('/', authenticateJWT, checkRoleAndPermission('Admin', 'manage_categories'), checkDuplicateCategory, CategoryController.createCategory.bind(CategoryController));

// Get all categories (no authentication required)
router.get('/', CategoryController.getCategories.bind(CategoryController));

// Get a specific category by ID (no authentication required)
router.get('/:id', CategoryController.getCategoryById.bind(CategoryController));

// Update a category by ID (requires authentication, admin role, and permission to manage categories)
router.patch('/:id', authenticateJWT, checkRoleAndPermission('Admin', 'manage_categories'), checkDuplicateCategory, CategoryController.updateCategory.bind(CategoryController));

// Delete a category by ID (requires authentication, admin role, and permission to manage categories)
router.delete('/:id', authenticateJWT, checkRoleAndPermission('Admin', 'manage_categories'), CategoryController.deleteCategory.bind(CategoryController));

export default router;
