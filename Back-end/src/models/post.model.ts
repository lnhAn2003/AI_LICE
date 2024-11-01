import mongoose, { Document, mongo, Schema } from "mongoose";

export interface IPost extends Document {
    threadId: mongoose.Types.ObjectId;
    authorId: mongoose.Types.ObjectId;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    isEdited: boolean;
    editHistory: {
        content: string;
        editedAt: Date;
    }[];
}

const PostSchema: Schema<IPost> = new Schema({
    threadId: { type: mongoose.Schema.Types.ObjectId, ref: "Thread", required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true},
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
    isEdited: { type: Boolean, default: false},
    editHistory: [
        {
            content: { type: String },
            editedAt: { type: Date, default: Date.now}
        }
    ]

})

PostSchema.pre<IPost>('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model<IPost>('Post', PostSchema);
 
