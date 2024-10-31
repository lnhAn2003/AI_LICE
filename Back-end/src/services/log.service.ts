import Log, { ILog } from "../models/log.model";
import mongoose from "mongoose";

class LogService {
  public async addEventToLog(logData: {
    userId: mongoose.Types.ObjectId;
    eventType: string;
    details: string;
    ipAddress: string;
    userAgent: string;
  }): Promise<ILog> {
    const { userId, eventType, details, ipAddress, userAgent } = logData;

    const newEvent = {
      eventType,
      details,
      ipAddress,
      userAgent,
      createdAt: new Date()
    };

    if (userId) {
      return await Log.findOneAndUpdate(
        { userId: new mongoose.Types.ObjectId(userId) },
        { $push: { history: newEvent } },
        { new: true, upsert: true } 
      );
    } else {
      const log = new Log({ history: [newEvent] });
      return await log.save();
    }
  }

  public async getLogs(filters: { userId?: string; eventType?: string }): Promise<ILog[]> {
    const query: any = {};
    if (filters.userId) query.userId = new mongoose.Types.ObjectId(filters.userId);
    if (filters.eventType) query["history.eventType"] = filters.eventType;

    return await Log.find(query).sort({ "history.createdAt": -1 });
  }
}

export default new LogService();
