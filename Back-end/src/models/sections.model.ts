import mongoose, { Document, Schema } from 'mongoose';

export interface ISection extends Document {
    sectionTitle: string;
    lessons: mongoose.Types.ObjectId[]; 
  }
  
  const SectionSchema: Schema<ISection> = new Schema({
    sectionTitle: { type: String, required: true },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  });
  
  export default mongoose.model<ISection>('Section', SectionSchema);
  