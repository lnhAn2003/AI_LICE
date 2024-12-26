import mongoose from "mongoose";
import Comment, { IComment } from "../models/comment.model";
import { fileUpload } from "../utils/awsS3";

class CommentService {
  public async createComment(
    commentData: Partial<IComment>,
    file?: { buffer: Buffer; mimeType: string },
    images?: { buffer: Buffer; mimeType: string }[]
  ): Promise<IComment> {
    const folder = `comments/${commentData.targetId || Date.now()}`;

    const fileUrl = file
      ? await fileUpload(file.buffer, `${folder}/files`, `file_${Date.now()}`, file.mimeType)
      : undefined;

    const imageUrls = images
      ? await Promise.all(
        images.map((image, index) =>
          fileUpload(image.buffer, `${folder}/images`, `image-${index + 1}.jpg`, image.mimeType)
        )
      )
      : [];

    const comment = new Comment({
      ...commentData,
      fileUrl,
      images: imageUrls,
    });

    return await comment.save();
  }

  public async getCommentByTarget(targetType: string, targetId: string): Promise<IComment[]> {
    return await Comment.find({
      targetType,
      targetId,
      isVisible: true,
      parentCommentId: null,
    })
      .populate([
        { path: 'authorId', select: 'username profile' },
        {
          path: 'replies',
          match: { isVisible: true },
          populate: { path: 'authorId', select: 'username profile' },
          options: { sort: { createdAt: -1 } },
        },
      ])
      .sort({ createdAt: -1 })
      .exec();
  }


  public async getCommentById(id: string): Promise<IComment | null> {
    return await Comment.findById(id)
      .populate({ path: 'authorId', select: 'username' })
      .exec();
  }

  public async updateComment(
    id: string,
    updateData: Partial<IComment>,
    file?: { buffer: Buffer; mimeType: string },
    images?: { buffer: Buffer; mimeType: string }[],
    editedBy?: string
  ): Promise<IComment | null> {
    const comment = await Comment.findById(id);
    if (!comment || !comment.isVisible) {
      throw new Error("Comment not found or already deleted.");
    }

    const folder = `comments/${comment.targetId || id}`;

    const fileUrl = file
      ? await fileUpload(file.buffer, `${folder}/files`, `file_${Date.now()}`, file.mimeType)
      : undefined;

    const imageUrls = images
      ? await Promise.all(
        images.map((image, index) =>
          fileUpload(image.buffer, `${folder}/images`, `image-${index + 1}.jpg`, image.mimeType)
        )
      )
      : [];

    if (fileUrl) comment.fileUrl = fileUrl;
    if (imageUrls.length > 0) comment.images = [...(comment.images || []), ...imageUrls];

    comment.editHistory.push({
      content: comment.content,
      editedAt: new Date(),
      editedBy: editedBy ? new mongoose.Types.ObjectId(editedBy) : undefined,
    });

    comment.content = updateData.content || comment.content;
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
