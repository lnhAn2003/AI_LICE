import mongoose, { Document, Schema } from "mongoose";

export interface IEditHistory {
  content: string;
  editedAt: Date;
  editedBy?: mongoose.Types.ObjectId;
}

export interface IComment extends Document {
  targetType: string; 
  targetId: mongoose.Types.ObjectId; 
  authorId: mongoose.Types.ObjectId; 
  content: string; 
  images?: string[];
  fileUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
  isVisible: boolean; 
  parentCommentId?: mongoose.Types.ObjectId;
  editHistory: IEditHistory[]; 
  replies?: IComment[];
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
    images: [{ type: String }], 
    fileUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isEdited: { type: Boolean, default: false },
    isVisible: { type: Boolean, default: true },
    parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment" },
    editHistory: [EditHistorySchema], 
  },
  { timestamps: true }
);

CommentSchema.virtual("replies", {
  ref: "Comment",
  localField: "_id",
  foreignField: "parentCommentId",
  options: { sort: { createdAt: -1 } },
});

CommentSchema.set("toObject", { virtuals: true });
CommentSchema.set("toJSON", { virtuals: true });

export default mongoose.model<IComment>("Comment", CommentSchema);
