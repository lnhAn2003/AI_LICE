import Comment, { IComment } from "../models/comment.model";

class CommentService {
    public async createComment(commentData: Partial<IComment>): Promise<IComment> {
        const comment = new Comment(commentData);
        return await comment.save();
    };

    public async getCommentByTarget(targetType: string, targetId: string): Promise<IComment[]> {
        return await Comment.find({ targetType, targetId })
            .populate({ path: 'authorId', select: 'username'})
            .sort({createdAt: -1});
    }

    public async getCommentById(id: string): Promise<IComment | null> {
        return await Comment.findById(id)
            .populate({ path: 'authorId', select: 'username'});
    }

    public async updatedComment(id: string, updateData: string): Promise<IComment | null> {
        const comment = await Comment.findById(id);
        if (!comment) {
            return null;
        }

        comment.editHisory.push({ content: comment.content, editedAt: new Date() });
        comment.content = updateData;
        comment.isEdited = true;
        comment.updatedAt = new Date();
        return await comment.save();
    }

    public async deleteComment(id: string): Promise<IComment | null> {
        return await Comment.findByIdAndDelete(id);
    }
}

export default new CommentService();