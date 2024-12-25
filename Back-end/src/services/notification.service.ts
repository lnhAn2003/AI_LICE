import Notification, { INotification } from "../models/notification.model";
import User from "../models/user.model"; 

class NotificationService {
    public async createNotification(notificationData: Partial<INotification>): Promise<INotification> {
        const notification = new Notification(notificationData);
        return await notification.save();
    }

    public async createNotificationForAllUsers(
        notificationData: Partial<INotification>
      ): Promise<INotification[]> {
        const users = await User.find({ "roleId.name": { $ne: "Admin" } }, "_id");
    
        const notifications: INotification[] = [];
        for (const user of users) {
          const notif = new Notification({
            ...notificationData,
            userId: user._id,
          });
          const saved = await notif.save();
          notifications.push(saved);
        }
    
        return notifications;
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
