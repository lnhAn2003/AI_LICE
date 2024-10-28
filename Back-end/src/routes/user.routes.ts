import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { passwordValidation } from '../middlewares/validation.middleware';
import { checkUserOwner } from '../middlewares/User.middleware';

const router = Router();

router.post('/register', passwordValidation, UserController.register.bind(UserController));
router.post('/login', UserController.login.bind(UserController));
router.get('/', UserController.getUsers.bind(UserController));
router.get('/:id', UserController.getUserById.bind(UserController));
router.put('/:id', authenticateJWT, checkUserOwner, UserController.updateUser.bind(UserController));
router.delete('/:id', authenticateJWT, checkUserOwner, UserController.deleteUser.bind(UserController));

export default router;
