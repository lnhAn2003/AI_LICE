import mongoose, { Document, Schema } from "mongoose";

export interface ILog extends Document {
  userId?: mongoose.Types.ObjectId;
  history: {
    eventType: string;
    details?: string;
    ipAddress: string;
    userAgent: string;
    createdAt: Date;
  }[];
}

const LogSchema: Schema<ILog> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  history: [
    {
      eventType: { type: String, required: true },
      details: { type: String },
      ipAddress: { type: String, required: true },
      userAgent: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  ]
});

export default mongoose.model<ILog>("Log", LogSchema);
