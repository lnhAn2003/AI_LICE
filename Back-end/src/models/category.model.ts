import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
    _id: string;
    name: string;
    description: string;
    icon: string;
    parentCategory: string;
    createdAt: Date;
    updatedAt: Date;
}

const CategorySchema: Schema<ICategory> = new Schema({
    _id: { type: String, unique: true, required: true},
    name: { type: String, unique: true, required: true},
    description: { type: String, required: true},
    icon: { type: String},
    parentCategory: { type: String, ref: "Category", default: null},
    createdAt: { type: Date, default: Date.now()},
    updatedAt: { type: Date, default: Date.now()}
});

export default mongoose.model<ICategory>('Category', CategorySchema);