import mongoose, { Document, Schema } from "mongoose";

export interface IThread extends Document {
    title: string;
    authorId: mongoose.Types.ObjectId;
    posts?: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
    views: number;
};

const ThreadSchema: Schema<IThread> = new Schema({
    title: { type: String, required: true},
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post"}],
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
    views: { type: Number, default: 0}
});

ThreadSchema.pre<IThread>('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model<IThread>('Thread', ThreadSchema);