import mongoose, { Document, Schema } from "mongoose";

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
}

const GameSharedSchema: Schema<IGameShared> = new Schema({
    title: { type: String, required: true, trim: true, unique: true },
    description: { type: String },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: [{ type: String }],
    fileUrl: { type: String },
    externalLinks: [
        {
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

export default mongoose.model<IGameShared>('GamesShared', GameSharedSchema);
