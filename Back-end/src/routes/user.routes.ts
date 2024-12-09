import { Router } from 'express';
import { upload } from '../utils/awsS3';
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

//User profile
router.get('/profile', authenticateJWT, UserController.getProfile.bind(UserController));

// Get all users
router.get('/', UserController.getUsers.bind(UserController));

// Get a specific user by ID
router.get('/:id', UserController.getUserById.bind(UserController));

// Endpoint để lấy hoạt động của người dùng
router.get('/:id/activity', UserController.getUserActivity);

// Update user details (authentication and ownership check required)
router.put('/:id', authenticateJWT, checkUserOwner, logActivity('User_updated_profile'), UserController.updateUser.bind(UserController));

// Delete a user account (authentication and ownership check required)
router.delete('/:id', authenticateJWT, checkUserOwner, logActivity('User_deleted_profile'), UserController.deleteUser.bind(UserController));

// Password change
router.patch('/changepassword', authenticateJWT, passwordValidation, UserController.changePassword.bind(UserController));

// Change avatar
router.post('/avatar', authenticateJWT, upload.single('avatar'), UserController.changeAvatar.bind(UserController));

export default router;
