import mongoose, { Document, Schema } from "mongoose";
import { IComment } from "./comment.model";

export interface IGameShared extends Document {
    title: string;
    description: string;
    uploadedBy: mongoose.Types.ObjectId;
    images: string[];
    fileUrl: string;
    externalLinks: {
        name: string;
        url: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
    downloadCount: number;
    viewCount: number;
    favorites: mongoose.Types.ObjectId[];
    tags: string[];
    categories: string[];
    commentId: mongoose.Types.ObjectId[];
    averageRating: number;
    ratingCount: number;
    ratings: {
        userId: mongoose.Types.ObjectId;
        rating: number;
        comment: string;
        createdAt: Date;
    }[];
    newRelease: boolean;
    version: string;
    successVotes: {
        likes: number;
        dislikes: number;
        percentage: number;
        userVotes: {
            userId: mongoose.Types.ObjectId;
            vote: string;
        }[];
    };
    changelog: {
        date: Date;
        description: string;
    }[];
    comments?: IComment[];
}

const GameSharedSchema: Schema<IGameShared> = new Schema({
    title: { type: String, required: true, trim: true, unique: true },
    description: { type: String },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: [{ type: String }],
    fileUrl: { type: String },
    externalLinks: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
            name: { type: String },
            url: { type: String }
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    downloadCount: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tags: [{ type: String }],
    categories: [{ type: String, ref: 'Category' }],
    commentId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    averageRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    ratings: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
            rating: { type: Number, required: true },
            comment: { type: String },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    newRelease: { type: Boolean, default: true },
    version: { type: String, default: 'v1.0.0'},
    successVotes: {
        likes: { type: Number, default: 0 },
        dislikes: { type: Number, default: 0 },
        percentage: { type: Number, default: 0 },
        userVotes: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
                vote: { type: String, enum: ['like', 'dislike'], required: true }
            }
        ]
    },
    changelog: [
        {
            date: { type: Date, default: Date.now },
            description: { type: String }
        }
    ],
});

GameSharedSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'targetId',
    match: { targetType: 'GamesShared' },
  });
  
  GameSharedSchema.set('toObject', { virtuals: true });
  GameSharedSchema.set('toJSON', { virtuals: true });
  

export default mongoose.model<IGameShared>('GamesShared', GameSharedSchema);
