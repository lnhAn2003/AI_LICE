import mongoose, { Document, Schema } from "mongoose";

export interface IComment extends Document {
    targetType: string;
    targetId: mongoose.Types.ObjectId;
    authorId: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    isEdited: boolean;
    editHisory: {
        content: string,
        editedAt: Date
    }[];
};

const CommentSchema: Schema<IComment> = new Schema({
    targetType: { type: String, required: true },
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "targetType"},
    authorId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"},
    content: { type: String, required: true},
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
    isEdited: { type: Boolean, default: false},
    editHisory: [{
        content: { type: String},
        editedAt: { type: Date, default: Date.now}
    }]
})

export default mongoose.model<IComment>('Comment', CommentSchema);