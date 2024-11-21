import { Request, Response } from "express";
import ThreadService from "../services/thread.service";
import UserService from "../services/user.service";
import mongoose from "mongoose";

export interface AuthRequest extends Request {
    user?: any;
}

class ThreadController {
    public async createThread(req: AuthRequest, res: Response): Promise<void> {
        try {
            const user = req.user as { id: string };
            if (!user) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }

            await UserService.updateLastActiveStatus(user.id, true);

            const authorId = new mongoose.Types.ObjectId(user.id);

            const threadData = {
                title: req.body.title,
                authorId: authorId,
                tags: req.body.tags,
                content: req.body.content,
                createdAt: new Date(),
                updatedAt: new Date(),
                views: 0,
            };

            const thread = await ThreadService.createThread(threadData);
            res.status(201).json(thread);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    public async getThreads(req: Request, res: Response): Promise<void> {
        try {
            const threads = await ThreadService.getThreads();
            res.status(200).json(threads);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    public async getThreadById(req: Request, res: Response): Promise<void> {
        try {
            const thread = await ThreadService.getThreadById(req.params.id);
            if (!thread) res.status(404).json({ message: 'Thread not found' });
            else res.status(200).json(thread);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    public async getThreadsByUserId(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId;
            const threads = await ThreadService.getThreadsByUserId(userId);
            if (threads.length === 0) res.status(404).json({ message: 'No threads found for this user' });
            else res.status(200).json(threads);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    public async updateThread(req: Request, res: Response): Promise<void> {
        try {
            const thread = await ThreadService.updateThread(req.params.id, req.body);
            if (!thread) res.status(404).json({ message: 'Thread not found' });
            else res.status(200).json(thread);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    public async softDeleteThread(req: AuthRequest, res: Response): Promise<void> {
        try {
            const thread = await ThreadService.softDeleteThread(req.params.id);
            if (!thread) res.status(404).json({ message: 'Thread not found' });
            else res.status(200).json({ message: 'Thread soft deleted' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    public async deleteThread(req: AuthRequest, res: Response): Promise<void> {
        try {
            const thread = await ThreadService.deleteThread(req.params.id);
            if (!thread) res.status(404).json({ message: 'Thread not found' });
            else res.status(200).json({ message: 'Thread deleted ' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    public async incrementViews(req: Request, res: Response): Promise<void> {
        try {
            await ThreadService.increaseViews(req.params.id);
            res.status(200).json({ message: 'Thread view incremented' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new ThreadController();
