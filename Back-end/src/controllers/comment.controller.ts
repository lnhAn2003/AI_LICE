import { Request, Response } from 'express';
import CommentService from '../services/comment.service';
import mongoose from 'mongoose';

export interface AuthRequest extends Request {
    user?: any;
}

class CommentController {
    public async createComment(req: AuthRequest, res: Response): Promise<void> {
        try {
            const user = req.user as { id: string };
            if (!user) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }

            const commentData = {
                targetType: req.body.targetType,
                targetId: new mongoose.Types.ObjectId(req.body.targetId),
                authorId: new mongoose.Types.ObjectId(user.id),
                content: req.body.content,
                createdAt: new Date(),
                updatedAt: new Date()
            };

            const comment = await CommentService.createComment(commentData);
            res.status(201).json(comment);
        } catch (error: any) {
            res.status(500).json({ message: error.message});
        }
    }

    public async getCommentByTarget(req: Request, res: Response): Promise<void> {
        try {
            const { targetType, targetId } = req.params;
            const comments = await CommentService.getCommentByTarget(targetType, targetId);
            res.status(200).json(comments)
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    public async getCommentById(req: Request, res: Response): Promise<void> {
        try {
            const comment = await CommentService.getCommentById(req.params.id);
            if (!comment) {
                res.status(404).json({ message: 'Comment not found' });
            } else {
                res.status(200).json(comment);
            }
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    public async updateComment(req: AuthRequest, res: Response): Promise<void> {
        try {
            const user = req.user as { id: string };
            if (!user) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }

            const comment = await CommentService.updatedComment(req.params.id, req.body.content);
            if (!comment) {
                res.status(404).json({ message: 'Comment not found' });
            } else {
                res.status(200).json(comment);
            }
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    public async deleteComment(req: AuthRequest, res: Response): Promise<void> {
        try {
            const user = req.user as { id: string };
            if (!user) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }

            const comment = await CommentService.deleteComment(req.params.id);
            if (!comment) {
                res.status(404).json({ message: 'Comment not found' });
            } else {
                res.status(200).json({ message: 'Comment deleted' });
            }
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new CommentController();