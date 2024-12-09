// src/controllers/progress.controller.ts
import { Request, Response } from "express";
import ProgressService from "../services/progress.service";

export interface AuthRequest extends Request {
    user?: { id: string };
}

class ProgressController {
    // Update progress
    public async updateProgress(req: AuthRequest, res: Response): Promise<void> {
        try {
            const user = req.user;
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const { courseId, lessonId } = req.body;

            if (!courseId || !lessonId) {
                res.status(400).json({ message: "Course ID and Lesson ID are required" });
                return;
            }

            const progress = await ProgressService.updateProgress(user.id, courseId, lessonId);
            res.status(200).json(progress);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get progress for a specific course
    public async getProgressByCourse(req: AuthRequest, res: Response): Promise<void> {
        try {
            const user = req.user;
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const { courseId } = req.params;
            if (!courseId) {
                res.status(400).json({ message: "Course ID is required" });
                return;
            }

            const progress = await ProgressService.getProgressByCourse(user.id, courseId);
            res.status(200).json(progress);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    // Get all progress for a user
    public async getAllProgress(req: AuthRequest, res: Response): Promise<void> {
        try {
            const user = req.user;
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const progressList = await ProgressService.getAllProgress(user.id);
            res.status(200).json(progressList);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async markSectionComplete(req: AuthRequest, res: Response): Promise<void> {
        try {
            const user = req.user;
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const { courseId, sectionId } = req.body;

            if (!courseId || !sectionId) {
                res.status(400).json({ message: "Course ID and Section ID are required" });
                return;
            }

            const updatedProgress = await ProgressService.markSectionComplete(user.id, courseId, sectionId);
            res.status(200).json(updatedProgress);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

}

export default new ProgressController();
