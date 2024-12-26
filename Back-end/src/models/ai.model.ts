import mongoose, { Document, Schema } from 'mongoose';

export interface IAIInteraction extends Document {
  userId: mongoose.Types.ObjectId;
  interactionType: string; 
  request: string;
  response: string; 
  responseTime: number; 
  createdAt: Date;
  meta?: {
    sourceLanguage?: string;
    targetLanguage?: string; 
  };
}

const AIInteractionSchema: Schema<IAIInteraction> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  interactionType: { type: String, required: true },
  request: { type: String, required: true },
  response: { type: String, required: true },
  responseTime: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  meta: {
    sourceLanguage: { type: String },
    targetLanguage: { type: String },
  },
});

export default mongoose.model<IAIInteraction>('AIInteraction', AIInteractionSchema);
