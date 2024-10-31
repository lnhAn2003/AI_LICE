import mongoose, { Document, Schema } from 'mongoose';

export interface IAIInteraction extends Document {
  userId: mongoose.Types.ObjectId;
  interactionType: string;
  request: string;
  response: string;
  responseTime: number;
  createdAt: Date;
}

const AIInteractionSchema: Schema<IAIInteraction> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
  interactionType: { type: String, required: true },
  request: { type: String, required: true },
  response: { type: String, required: true },
  responseTime: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IAIInteraction>('AIInteraction', AIInteractionSchema);
