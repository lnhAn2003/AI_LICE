import mongoose, { Document, Schema } from 'mongoose';

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
  ratings: IRating[]; 
  favorites: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const RatingSchema: Schema<IRating> = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
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
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
    tags: [{ type: String }],
    categories: [{ type: String, ref: 'Category' }],
    averageRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    ratings: [RatingSchema], 
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
  },
  { timestamps: true }
);

export default mongoose.model<ICourse>('Course', CourseSchema);
