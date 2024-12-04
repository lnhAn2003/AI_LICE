// src/models/lesson.model.ts
import mongoose, { Document, Schema } from 'mongoose';
import { IComment } from './comment.model';

export interface ILesson extends Document {
  sectionId: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  title: string;
  videoUrl?: string;
  textContent?: string;
  resources?: { name: string; url: string }[];
  commentId: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
  editHistory: {
    title?: string;
    videoUrl?: string;
    textContent?: string;
    resources?: { name: string; url: string }[];
    editedAt: Date;
  }[];
  comments?: IComment[];
}

const LessonSchema: Schema<ILesson> = new Schema({
  sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  videoUrl: { type: String },
  textContent: { type: String },
  resources: [{ name: String, url: String }],
  commentId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isEdited: { type: Boolean, default: false },
  editHistory: [
    {
      title: { type: String },
      videoUrl: { type: String },
      textContent: { type: String },
      resources: [{ name: String, url: String }],
      editedAt: { type: Date, default: Date.now },
    },
  ],
});

// Middleware to update `updatedAt` before saving
LessonSchema.pre<ILesson>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Virtual field for comments
LessonSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'targetId',
  match: { targetType: 'Lesson' },
});

LessonSchema.set('toObject', { virtuals: true });
LessonSchema.set('toJSON', { virtuals: true });

export default mongoose.model<ILesson>('Lesson', LessonSchema);
