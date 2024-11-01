import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { passwordValidation } from '../middlewares/validation.middleware';
import { checkUserOwner } from '../middlewares/user.middleware';
import { logActivity } from "../middlewares/log.middleware";

const router = Router();

// Register a new user
router.post('/register', passwordValidation, UserController.register.bind(UserController));

// User login
router.post('/login', UserController.login.bind(UserController));

// Get all users
router.get('/', UserController.getUsers.bind(UserController));

// Get a specific user by ID
router.get('/:id', UserController.getUserById.bind(UserController));

// Update user details (authentication and ownership check required)
router.put('/:id', authenticateJWT, checkUserOwner, logActivity('User_updated_profile'), UserController.updateUser.bind(UserController));

// Delete a user account (authentication and ownership check required)
router.delete('/:id', authenticateJWT, checkUserOwner, logActivity('User_deleted_profile'), UserController.deleteUser.bind(UserController));

export default router;
