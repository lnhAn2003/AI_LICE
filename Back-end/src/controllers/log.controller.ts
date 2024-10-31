import LogService from "../services/log.service";
import { Request, Response } from "express";
import mongoose from "mongoose";

export interface AuthRequest extends Request {
    user?: any;
}

class LogController {
    public async createLogShared(req: AuthRequest, res: Response): Promise<void> {
        try {
            const user = req.user as { id: string };
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const logData = {
                eventType: req.body.eventType,
                userId: new mongoose.Types.ObjectId(user.id),
                details: req.body.details,
                ipAddress: req.ip || "Unknow IP",
                userAgent: req.headers['user-agent'] || 'Unknown',
            };
            const newLog = await LogService.addEventToLog(logData);
            res.status(201).json(newLog);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async getLogs(req: Request, res: Response): Promise<void> {
        try {
          const filters = {
            userId: req.query.userId as string,
            eventType: req.query.eventType as string,
          };
          const logs = await LogService.getLogs(filters);
          res.status(200).json(logs);
        } catch (error: any) {
          res.status(500).json({ message: error.message });
        }
    }
}

export default new LogController();