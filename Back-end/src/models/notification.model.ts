import mongoose, { Document, Schema } from "mongoose";

export interface INotification extends Document {
    userId: mongoose.Types.ObjectId;
    type: string;
    referenceId: mongoose.Types.ObjectId;
    referenceType: string;
    message: string;
    details?: string;
    priority: 'low' | 'medium' | 'high';
    read: boolean;
    readAt?: Date;
    expiresAt?: Date;
    createdAt: Date;
}

const NotificationSchema: Schema<INotification> = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    referenceId: { type: mongoose.Schema.Types.ObjectId, required: true },
    referenceType: { type: String, required: true },
    message: { type: String, required: true },
    details: { type: String },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    read: { type: Boolean, default: false },
    readAt: { type: Date },
    expiresAt: { type: Date },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<INotification>('Notification', NotificationSchema);
