// src/routes/progress.routes.ts
import { Router } from "express";
import ProgressController from "../controllers/progress.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";

const router = Router();

// Update progress
router.post("/update", authenticateJWT, ProgressController.updateProgress.bind(ProgressController));

// Get progress for a specific course
router.get("/:courseId", authenticateJWT, ProgressController.getProgressByCourse.bind(ProgressController));

// Get all progress for a user
router.get("/", authenticateJWT, ProgressController.getAllProgress.bind(ProgressController));

// Mark a section as complete
router.post("/section/complete", authenticateJWT, ProgressController.markSectionComplete.bind(ProgressController));


export default router;
