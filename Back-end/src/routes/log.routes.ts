import { Router } from "express";
import LogController from "../controllers/log.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const router = Router();

// Get all logs (requires authentication)
router.get("/", authenticateJWT, LogController.getLogs.bind(LogController));

// Route to get logs by user ID
router.get("/user/history", authenticateJWT, LogController.getUserLogHistory.bind(LogController));


export default router;
