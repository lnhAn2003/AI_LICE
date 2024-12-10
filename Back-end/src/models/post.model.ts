import mongoose, { Document, Schema } from "mongoose";
import { IComment } from "./comment.model";

export interface IPost extends Document {
  threadId: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  content: string;
  images?: string[];
  commentId: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
  editHistory: {
    content: string;
    editedAt: Date;
  }[];
  comments?: IComment[];
}

const PostSchema: Schema<IPost> = new Schema({
  threadId: { type: mongoose.Schema.Types.ObjectId, ref: "Thread", required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  images: { type: [String], default: [] },
  commentId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isEdited: { type: Boolean, default: false },
  editHistory: [
    {
      content: { type: String },
      editedAt: { type: Date, default: Date.now },
    },
  ],
});

PostSchema.pre<IPost>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "targetId",
  match: { targetType: "Post" },
});

PostSchema.set("toObject", { virtuals: true });
PostSchema.set("toJSON", { virtuals: true });

export default mongoose.model<IPost>("Post", PostSchema);
