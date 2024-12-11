import mongoose, { Document, Schema } from "mongoose";

export interface IEditHistory {
  content: string;
  editedAt: Date;
  editedBy?: mongoose.Types.ObjectId;
}

export interface IComment extends Document {
  targetType: string; // Target type (e.g., Post, GameShared, Course, Lesson)
  targetId: mongoose.Types.ObjectId; // Target ID
  authorId: mongoose.Types.ObjectId; // Comment author
  content: string; // Comment content
  images?: string[]; // URLs for uploaded images
  fileUrl?: string; // URL for uploaded files
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean; // Indicates if the comment was edited
  isVisible: boolean; // Indicates if the comment is visible
  parentCommentId?: mongoose.Types.ObjectId; // Parent comment ID for replies
  editHistory: IEditHistory[]; // List of previous edits
  replies?: IComment[]; // Replies to this comment
}

const EditHistorySchema: Schema<IEditHistory> = new Schema(
  {
    content: { type: String, required: true },
    editedAt: { type: Date, default: Date.now },
    editedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { _id: false }
);

const CommentSchema: Schema<IComment> = new Schema(
  {
    targetType: { type: String, required: true },
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "targetType" },
    authorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    content: { type: String, required: true },
    images: [{ type: String }], // Array of image URLs
    fileUrl: { type: String }, // File URL
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isEdited: { type: Boolean, default: false },
    isVisible: { type: Boolean, default: true },
    parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    editHistory: [EditHistorySchema], // Edit history schema
  },
  { timestamps: true }
);

CommentSchema.virtual("replies", {
  ref: "Comment",
  localField: "_id",
  foreignField: "parentCommentId",
  options: { sort: { createdAt: -1 } }, // Replies sorted by creation date
});

CommentSchema.set("toObject", { virtuals: true });
CommentSchema.set("toJSON", { virtuals: true });

export default mongoose.model<IComment>("Comment", CommentSchema);
