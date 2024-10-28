import mongoose, {Schema, Document} from "mongoose";

export interface IRole extends Document {
    name: string;
    permission: [string];
    createdAt: Date;
    updatedAt: Date;
};

const RoleSchema: Schema<IRole> = new Schema({
    name: { type: String, required: true},
    permission: [{type: String, required: true}],
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now}, 
});

RoleSchema.pre<IRole>('save', function (next) {
    this.updatedAt = new Date();
    next();
});

export default mongoose.model<IRole>('Role', RoleSchema);