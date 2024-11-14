import { Request, Response } from 'express';
import NotificationService from '../services/notification.service';
import { roleUserRequest } from '../middlewares/role.middleware';

class NotificationController {
    public async createNotification(req: roleUserRequest, res: Response): Promise<void> {
        try {
            const notification = await NotificationService.createNotification(req.body);
            res.status(201).json(notification);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async getAllNotifications(req: Request, res: Response): Promise<void> {
        try {
            const notifications = await NotificationService.getAllNotifications();
            res.status(200).json(notifications);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    public async getNotificationsByUserId(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;
            const notifications = await NotificationService.getNotificationsByUserId(userId);
            res.status(200).json(notifications);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    public async updateNotification(req: roleUserRequest, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const notification = await NotificationService.updateNotification(id, req.body);
            if (!notification) {
                res.status(404).json({ message: 'Notification not found' });
            } else {
                res.status(200).json(notification);
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async deleteNotification(req: roleUserRequest, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const notification = await NotificationService.deleteNotification(id);
            if (!notification) {
                res.status(404).json({ message: 'Notification not found' });
            } else {
                res.status(200).json({ message: 'Notification deleted' });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new NotificationController();
