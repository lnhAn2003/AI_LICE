import { Request, Response } from 'express';
import CommentService from '../services/comment.service';
import mongoose from 'mongoose';
import postModel from '../models/post.model';
import gamesharedModel from '../models/gameshared.model';
import courseModel from '../models/course.model';
import lessonModel from '../models/lesson.model';

export interface AuthRequest extends Request {
    user?: any;
}

export interface MulterFiles {
    [fieldname: string]: Express.Multer.File[];
}

class CommentController {
    public async createComment(req: AuthRequest, res: Response): Promise<void> {
        try {
            const user = req.user as { id: string };
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const { targetType, targetId, content, parentCommentId } = req.body;

            if (!targetType || !targetId || !content || content.trim() === "") {
                res.status(400).json({ message: "Target type, target ID, and content are required" });
                return;
            }

            const files = req.files as MulterFiles;
            const file = files?.["file"]?.[0]
                ? { buffer: files["file"][0].buffer, mimeType: files["file"][0].mimetype }
                : undefined;

            const images = files?.["images"]
                ? files["images"].map((file) => ({
                    buffer: file.buffer,
                    mimeType: file.mimetype,
                }))
                : [];

            const commentData = {
                targetType,
                targetId: new mongoose.Types.ObjectId(targetId),
                authorId: new mongoose.Types.ObjectId(user.id),
                content: content.trim(),
                parentCommentId: parentCommentId ? new mongoose.Types.ObjectId(parentCommentId) : undefined,
            };

            const comment = await CommentService.createComment(commentData, file, images);
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
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const files = req.files as MulterFiles;
            const file = files?.["file"]?.[0]
                ? { buffer: files["file"][0].buffer, mimeType: files["file"][0].mimetype }
                : undefined;

            const images = files?.["images"]
                ? files["images"].map((file) => ({
                    buffer: file.buffer,
                    mimeType: file.mimetype,
                }))
                : [];

            const comment = await CommentService.updateComment(
                req.params.id,
                req.body,
                file,
                images,
                user.id
            );

            if (!comment) {
                res.status(404).json({ message: "Comment not found or already deleted" });
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
