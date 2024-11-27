import { Request, Response } from 'express';
import CommentService from '../services/comment.service';
import mongoose from 'mongoose';
import postModel from '../models/post.model';
import gamesharedModel from '../models/gameshared.model';

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

            const { targetType, targetId, content, parentCommentId } = req.body;

            if (!targetType || !targetId || !content || content.trim() === '') {
                res.status(400).json({ message: 'Target type, target ID, and content are required' });
                return;
            }

            let targetExists = false;
            if (targetType === 'Post') {
                targetExists = await postModel.exists({ _id: targetId }) !== null;
            } else if (targetType === 'GameShared') {
                targetExists = await gamesharedModel.exists({ _id: targetId }) !== null;
            }

            if (!targetExists) {
                res.status(400).json({ message: 'Target ID does not match the specified target type or does not exist' });
                return;
            }

            let parentComment = null;
            if (parentCommentId) {
                parentComment = await CommentService.getCommentById(parentCommentId);
                if (!parentComment || !parentComment.isVisible) {
                    res.status(400).json({ message: 'Parent comment does not exists or not visible' });
                    return
                }
            }

            const commentData = {
                targetType,
                targetId: new mongoose.Types.ObjectId(targetId),
                authorId: new mongoose.Types.ObjectId(user.id),
                content: content.trim(),
                createdAt: new Date(),
                updatedAt: new Date(),
                parentCommentId: parentCommentId ? new mongoose.Types.ObjectId(parentCommentId) : undefined,
            };

            const comment = await CommentService.createComment(commentData);

            if (!parentCommentId) {
                if (targetType === 'Post') {
                    await postModel.findByIdAndUpdate(targetId, { $push: { commentId: comment._id } });
                } else if (targetType === 'GameShared') {
                    await gamesharedModel.findByIdAndUpdate(targetId, { $push: { commentId: comment._id } });
                }
            }

            res.status(201).json(comment);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }


    public async getCommentByTarget(req: Request, res: Response): Promise<void> {
        try {
            const { targetType, targetId } = req.params;
            const comments = await CommentService.getCommentByTarget(targetType, targetId);
            res.status(200).json(comments);
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

            if (!req.body.content || req.body.content.trim() === '') {
                res.status(400).json({ message: 'Content cannot be empty' });
                return;
            }

            const comment = await CommentService.updateComment(req.params.id, req.body.content, user.id);
            if (!comment) {
                res.status(404).json({ message: 'Comment not found or already deleted' });
            } else {
                res.status(200).json(comment);
            }
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    public async softDeleteComment(req: AuthRequest, res: Response): Promise<void> {
        try {
            const user = req.user as { id: string };
            if (!user) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }

            const comment = await CommentService.softDeleteComment(req.params.id);
            if (!comment) {
                res.status(404).json({ message: 'Comment not found or already deleted' });
            } else {
                res.status(200).json({ message: 'Comment deleted' });
            }
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new CommentController();
