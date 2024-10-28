import { Router } from "express";
import CategoryController from "../controllers/category.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { checkRoleAndPermission } from '../middlewares/role.middleware';
import { checkDuplicateCategory } from "../middlewares/category.middleware";

const router = Router();

router.post('/', authenticateJWT, checkRoleAndPermission('Admin', 'manage_category'), checkDuplicateCategory , CategoryController.createCategory.bind(CategoryController));
router.get('/', CategoryController.getCategories.bind(CategoryController));
router.get('/:id', CategoryController.getCategoryById.bind(CategoryController));
router.put('/:id', authenticateJWT, checkRoleAndPermission('Admin', 'manage_category'), checkDuplicateCategory, CategoryController.updateCategory.bind(CategoryController));
router.delete('/:id', authenticateJWT, checkRoleAndPermission('Admin', 'manage_category'), CategoryController.deleteCategory.bind(CategoryController));

export default router;