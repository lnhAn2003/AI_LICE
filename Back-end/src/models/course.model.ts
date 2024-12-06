// src/models/course.model.ts
import mongoose, { Document, Schema } from 'mongoose';
import { IComment } from './comment.model';

export interface IRating {
  userId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface ICourse extends Document {
  title: string;
  description: string;
  createdBy: mongoose.Types.ObjectId;
  sections: mongoose.Types.ObjectId[];
  tags: string[];
  categories: string[];
  averageRating: number;
  ratingCount: number;
  resource: string[];
  screenshot: string[];
  ratings: IRating[];
  favorites: mongoose.Types.ObjectId[];
  commentId: mongoose.Types.ObjectId[];      
  comments?: IComment[];                    
  createdAt: Date;
  updatedAt: Date;
}

const RatingSchema: Schema<IRating> = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const CourseSchema: Schema<ICourse> = new Schema(
  {
    title: { type: String, required: true, trim: true, unique: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
    tags: [{ type: String }],
    categories: [{ type: String, ref: 'Category' }],
    averageRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    ratings: [RatingSchema],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    commentId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    resource: [{ type: String }],
    screenshot: [{ type: String }], 
  },
  { timestamps: true }
);

CourseSchema.virtual('comments', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'targetId',
  match: { targetType: 'Course' },
});

CourseSchema.set('toObject', { virtuals: true });
CourseSchema.set('toJSON', { virtuals: true });

export default mongoose.model<ICourse>('Course', CourseSchema);
