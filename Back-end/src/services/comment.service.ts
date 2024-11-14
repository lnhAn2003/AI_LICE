import mongoose from "mongoose";
import Comment, { IComment } from "../models/comment.model";

class CommentService {
    public async createComment(commentData: Partial<IComment>): Promise<IComment> {
        if (!commentData.targetId || !commentData.targetType) {
            throw new Error('Target ID and Target Type are required for creating a comment.');
        }

        const comment = new Comment(commentData);
        return await comment.save();
    }

    public async getCommentByTarget(targetType: string, targetId: string): Promise<IComment[]> {
        return await Comment.find({ targetType, targetId, isVisible: true })
            .populate({ path: 'authorId', select: 'username' })
            .sort({ createdAt: -1 })
            .exec();
    }

    public async getCommentById(id: string): Promise<IComment | null> {
        return await Comment.findById(id)
            .populate({ path: 'authorId', select: 'username' })
            .exec();
    }

    public async updateComment(id: string, updateData: string, editedBy?: string): Promise<IComment | null> {
        const comment = await Comment.findById(id);
        if (!comment || !comment.isVisible) {
            return null;
        }

        if (updateData.trim() === '') {
            throw new Error('Content cannot be empty');
        }

        comment.editHistory.push({
            content: comment.content,
            editedAt: new Date(),
            editedBy: editedBy ? new mongoose.Types.ObjectId(editedBy) : undefined
        });

        comment.content = updateData;
        comment.isEdited = true;
        comment.updatedAt = new Date();

        return await comment.save();
    }

    public async softDeleteComment(id: string): Promise<IComment | null> {
        const comment = await Comment.findById(id);
        if (!comment || !comment.isVisible) {
            return null;
        }

        comment.isVisible = false;
        comment.updatedAt = new Date();
        return await comment.save();
    }
}

export default new CommentService();
