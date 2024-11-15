import mongoose, { Document, Schema } from "mongoose";

export interface INews extends Document {
  title: string;
  message: string;
  authorId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  isImportant: boolean;
  views: number;
}

const NewsSchema: Schema<INews> = new Schema({
  title: { type: String, required: true, trim: true },
  message: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isImportant: { type: Boolean, default: false },
  views: { type: Number, default: 0 }
});

export default mongoose.model<INews>('News', NewsSchema);
