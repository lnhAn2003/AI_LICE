import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profile: {
    avatarUrl?: string;
    bio?: string;
    socialLinks?: string[];
    locale?: string;
    preferences: {
      notifications: boolean;
      theme: string;
    };
  };
  roleId: mongoose.Types.ObjectId;
  status: {
    online: boolean;
    lastActive: Date;
  };
  joinedAt: Date;
  lastLogin: Date;
  threads?: mongoose.Types.ObjectId[];
  posts?: mongoose.Types.ObjectId[];
  gamesShared?: mongoose.Types.ObjectId[];
  aiInteractions?: mongoose.Types.ObjectId[];
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    avatarUrl: { type: String },
    bio: { type: String },
    socialLinks: [{ type: String }],
    locale: { type: String, default: 'en' },
    preferences: {
      notifications: { type: Boolean, default: true },
      theme: { type: String, default: 'light' },
    },
  },
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: false, default: '6718abe7a0cbd054c6794d30'},
  status: {
    online: { type: Boolean, default: false },
    lastActive: { type: Date, default: Date.now },
  },
  joinedAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  threads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thread' }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  gamesShared: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GamesShared' }],
  aiInteractions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AIInteraction' }],
});

// Hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);
