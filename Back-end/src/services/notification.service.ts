import Notification, { INotification } from "../models/notification.model";

class NotificationService {
    public async createNotification(notificationData: Partial<INotification>): Promise<INotification> {
        const notification = new Notification(notificationData);
        return await notification.save();
    }

    public async getAllNotifications(): Promise<INotification[]> {
        return await Notification.find().sort({ createdAt: -1 });
    }

    public async getNotificationsByUserId(userId: string): Promise<INotification[]> {
        return await Notification.find({ userId }).sort({ createdAt: -1 });
    }

    public async updateNotification(id: string, updateData: Partial<INotification>): Promise<INotification | null> {
        return await Notification.findByIdAndUpdate(id, updateData, { new: true });
    }

    public async deleteNotification(id: string): Promise<INotification | null> {
        return await Notification.findByIdAndDelete(id);
    }
}

export default new NotificationService();
