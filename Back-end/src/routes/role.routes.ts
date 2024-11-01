import { Router } from 'express';
import RoleController from '../controllers/role.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { checkRoleAndPermission } from '../middlewares/role.middleware';

const router = Router();

// Create a new role (no authentication required)
router.post('/', RoleController.createRole.bind(RoleController));

// Get all roles (requires authentication and admin role with permission to manage users)
router.get('/', authenticateJWT, checkRoleAndPermission('Admin', 'manage_users'), RoleController.getRoles.bind(RoleController));

// Get a specific role by ID (requires authentication and admin role with permission to manage users)
router.get('/:id', authenticateJWT, checkRoleAndPermission('Admin', 'manage_users'), RoleController.getRoleById.bind(RoleController));

// Update a specific role by ID (requires authentication and admin role with permission to manage users)
router.put('/:id', authenticateJWT, checkRoleAndPermission('Admin', 'manage_users'), RoleController.updateRole.bind(RoleController));

// Delete a specific role by ID (requires authentication and admin role with permission to manage users)
router.delete('/:id', authenticateJWT, checkRoleAndPermission('Admin', 'manage_users'), RoleController.deleteRole.bind(RoleController));

export default router;
