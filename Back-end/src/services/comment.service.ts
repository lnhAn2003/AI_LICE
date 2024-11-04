import mongoose from "mongoose";
import Comment, { IComment } from "../models/comment.model";

class CommentService {
    public async createComment(commentData: Partial<IComment>): Promise<IComment> {
        const comment = new Comment(commentData);
        return await comment.save();
    }

    public async getCommentByTarget(targetType: string, targetId: string): Promise<IComment[]> {
        return await Comment.find({ targetType, targetId, isVisible: true }) // Only retrieve visible comments
            .populate({ path: 'authorId', select: 'username' })
            .sort({ createdAt: -1 });
    }

    public async getCommentById(id: string): Promise<IComment | null> {
        return await Comment.findById(id)
            .populate({ path: 'authorId', select: 'username' });
    }

    public async updatedComment(id: string, updateData: string, editedBy?: string): Promise<IComment | null> {
        const comment = await Comment.findById(id);
        if (!comment) {
            return null;
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
        return await Comment.findByIdAndUpdate(
            id,
            { isVisible: false },
        );
    }
}

export default new CommentService();
