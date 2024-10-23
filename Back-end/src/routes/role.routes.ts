import { Router } from 'express';
import RoleController from '../controllers/role.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { checkRoleAndPermission } from '../middlewares/role.middleware';

const router = Router();

router.post('/', authenticateJWT, checkRoleAndPermission('Admin', 'manage_users'), RoleController.createRole.bind(RoleController));
router.get('/', authenticateJWT, checkRoleAndPermission('Admin', 'manage_users'), RoleController.getRoles.bind(RoleController));
router.get('/:id', authenticateJWT, checkRoleAndPermission('Admin', 'manage_users'), RoleController.getRoleById.bind(RoleController));
router.put('/:id', authenticateJWT, checkRoleAndPermission('Admin', 'manage_users'), RoleController.updateRole.bind(RoleController));
router.delete('/:id', authenticateJWT, checkRoleAndPermission('Admin', 'manage_users'), RoleController.deleteRole.bind(RoleController));

export default router;