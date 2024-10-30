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
    averageRating: number;
    ratingCount: number;
    ratings: {
        userId: mongoose.Types.ObjectId;
        rating: number;
        comment: string;
        createdAt: Date;
    }[];
    favorites: mongoose.Types.ObjectId[];
    commentIds: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const CourseSchema: Schema<ICourse> = new Schema({
    title: { type: String, required: true },
    description: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    content: [
        {
            sectionTitle: String,
            lessons: [
                {
                    title: String,
                    videoUrl: String,
                    textContent: String,
                    resources: [{ name: String, url: String }],
                    createdAt: { type: Date, default: Date.now },
                    updatedAt: { type: Date, default: Date.now }
                }
            ]
        }
    ],
    tags: [String],
    categories: [{ type: String, ref: 'Category' }],
    averageRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    ratings: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
            rating: { type: Number, min: 1, max: 5 },
            comment: String,
            createdAt: { type: Date, default: Date.now }
        }
    ],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
    commentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<ICourse>('Course', CourseSchema);
