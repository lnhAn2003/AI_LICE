import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
    title: string;
    description: string;
    createdBy: mongoose.Types.ObjectId;
    content: {
        sectionTitle: string;
        lessons: {
            title: string;
            videoUrl?: string;
            textContent?: string;
            resources?: { name: string; url: string }[];
            createdAt: Date;
            updatedAt: Date;
        }[];
    }[];
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
    favorites: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const CourseSchema: Schema<ICourse> = new Schema({
    title: { type: String, required: true, trim: true, unique: true },
    description: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    content: [
        {
            sectionTitle: { type: String },
            lessons: [
                {
                    title: { type: String },
                    videoUrl: { type: String },
                    textContent: { type: String },
                    resources: [{ name: String, url: String }],
                    createdAt: { type: Date, default: Date.now },
                    updatedAt: { type: Date, default: Date.now }
                }
            ]
        }
    ],
    tags: [{type: String}],
    categories: [{ type: String, ref: 'Category' }],
    commentId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    averageRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    ratings: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
            rating: { type: Number, min: 1, max: 5 },
            comment: { type: String },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<ICourse>('Course', CourseSchema);
