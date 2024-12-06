import mongoose, { Document, Schema } from "mongoose";

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId;         
  courseId: mongoose.Types.ObjectId;          
  completedLessons: mongoose.Types.ObjectId[]; 
  completedSections: mongoose.Types.ObjectId[]; 
  overallProgress: number;                    
  lastActivity: Date;                        
  createdAt: Date;                            
  updatedAt: Date;                         
}

const ProgressSchema: Schema<IProgress> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
  completedSections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
  overallProgress: { type: Number, default: 0 }, 
  lastActivity: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ProgressSchema.pre<IProgress>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<IProgress>("Progress", ProgressSchema);
