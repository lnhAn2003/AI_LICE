import mongoose, { Document, Schema } from "mongoose";

export interface IThread extends Document {
    title: string;
    authorId: mongoose.Types.ObjectId;
    tags: string[];
    content: string;
    posts?: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
    views: number;
    isVisible: boolean;
    isPinned: boolean;
    fileUrl?: string; 
    images?: string[]; 
  }
  
  const ThreadSchema: Schema<IThread> = new Schema({
    title: { type: String, required: true, trim: true, maxlength: 100 },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: String, required: true }],
    content: { type: String, required: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
    isPinned: { type: Boolean, default: false },
    fileUrl: { type: String }, // File URL field
    images: [{ type: String }], // Image URLs field
  });
  
  ThreadSchema.pre<IThread>("save", function (next) {
    this.updatedAt = new Date();
    next();
  });
  
  export default mongoose.model<IThread>("Thread", ThreadSchema);
  