// src/models/section.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface ISection extends Document {
  courseId: mongoose.Types.ObjectId;
  authorId?: mongoose.Types.ObjectId;
  sectionTitle: string;
  lessons: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
  editHistory: {
    sectionTitle?: string;
    editedAt: Date;
  }[];
}

const SectionSchema: Schema<ISection> = new Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sectionTitle: { type: String, required: true },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isEdited: { type: Boolean, default: false },
  editHistory: [
    {
      sectionTitle: { type: String },
      editedAt: { type: Date, default: Date.now },
    },
  ],
});

SectionSchema.pre<ISection>('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<ISection>('Section', SectionSchema);
