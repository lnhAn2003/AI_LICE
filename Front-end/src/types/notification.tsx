// src/types/notification.ts
export interface NotificationData {
    _id: string;
    userId: string;
    type: string;                
    referenceId?: string;        
    referenceType?: string;      
    message: string;
    details?: string;
    priority?: "low" | "medium" | "high";
    read: boolean;
    readAt?: string;
    expiresAt?: string;
    createdAt: string;
  }
  