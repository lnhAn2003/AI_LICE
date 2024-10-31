import { Router } from "express";
import LogController from "../controllers/log.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticateJWT, LogController.getLogs.bind(LogController));

export default router;
