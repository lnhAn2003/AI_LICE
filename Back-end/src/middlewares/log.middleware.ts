import { Request, Response, NextFunction } from "express";
import LogService from "../services/log.service";
import { AuthRequest } from "../middlewares/auth.middleware";

const formatEventType = (eventType: string, req: AuthRequest): string => {
  return eventType.replace(/\{\$(\w+)\}/g, (match, key) => {
    return req.user?.[key] || req.params[key] || req.body[key] || `unknown_${key}`;
  });
};

export const logActivity = (eventType: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const formattedEventType = formatEventType(eventType, req);

      const logData = {
        eventType: formattedEventType,
        userId: req.user?.id || null,
        details: JSON.stringify(req.body),
        ipAddress: req.ip || "Unknown IP",
        userAgent: req.headers["user-agent"] || "Unknown",
      };

      await LogService.addEventToLog(logData);
      next();
    } catch (error) {
      console.error("Error logging activity:", error);
      next();
    }
  };
};
