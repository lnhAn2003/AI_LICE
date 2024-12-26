import { Router } from 'express';
import notificationController from '../controllers/notification.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { checkRoleAndPermission } from '../middlewares/role.middleware';

const router = Router();

// General routes
router.get('/', authenticateJWT, notificationController.getAllNotifications.bind(notificationController));
router.get('/:userId', authenticateJWT, notificationController.getNotificationsByUserId.bind(notificationController));
router.patch('/:id', authenticateJWT, notificationController.markAsRead.bind(notificationController));
router.delete('/:id', authenticateJWT, notificationController.deleteNotification.bind(notificationController));

// Admin-only routes for managing notifications
router.post('/', authenticateJWT, checkRoleAndPermission('Admin', 'manage_notifications'), notificationController.createNotification.bind(notificationController));
router.post("/broadcast", authenticateJWT, checkRoleAndPermission("Admin", "manage_notifications"), notificationController.createBroadcastNotification.bind(notificationController));
router.patch('/:id',authenticateJWT, checkRoleAndPermission('Admin', 'manage_notifications'), notificationController.updateNotification.bind(notificationController));

export default router;
