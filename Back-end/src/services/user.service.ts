import jwt from 'jsonwebtoken';
import config from '../config';
import bcrypt from 'bcrypt';
import User, { IUser } from '../models/user.model';

class UserService {
  public async register(userData: Partial<IUser>): Promise<IUser> {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error('Email already in use');
    }
    const user = new User(userData);
    return await user.save();
  }

  public async login(email: string, password: string): Promise<{ user: IUser; token: string }> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
      { id: user._id, roleId: user.roleId },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    return { user, token };
  }

  public async getUsers(): Promise<IUser[]> {
    return await User.find().select('-password')
      .populate({ path: 'posts', select: 'content' })
      .populate({ path: 'threads', select: 'title' })
      .populate({ path: 'roleId', select: 'name' });
  }

  public async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id).select('-password')
      .populate('roleId', 'name')
      .populate({ path: 'posts', select: 'content' })
      .populate({ path: 'threads', select: 'title' })
      .populate({ path: 'roleId', select: 'name' })
      .lean();
  }

  public async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
    const existingUser = await User.findById(id);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Convert existing user doc to plain object
    const existingUserObj = existingUser.toObject();

    // Merge nested objects like `profile` and `profile.preferences`
    const updatedProfile = {
      ...existingUserObj.profile,
      ...(updateData.profile || {}),
      preferences: {
        ...existingUserObj.profile.preferences,
        ...(updateData.profile?.preferences || {}),
      },
    };

    // Construct the final update object
    const finalUpdateData = {
      ...updateData,
      profile: updatedProfile,
    };

    // Ensure we do not re-hash the password here if it's not being updated
    // Note: If password is changed, the 'save' middleware on the model will handle hashing.
    const updatedUser = await User.findByIdAndUpdate(
      id,
      finalUpdateData,
      { new: true }
    ).select('-password'); // Exclude the password field

    return updatedUser;
  }

  public async deleteUser(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
  }

  public async changePassword(id: string, oldPassword: string, newPassword: string): Promise<void> {
    const user = await User.findById(id);
    if (!user) throw new Error('User not found');

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) throw new Error('Incorrect old password');

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
  }

  public async updateLastLoginStatus(userId: string): Promise<IUser | null>{
    return await User.findByIdAndUpdate(
      userId,
      {
        'lastLogin': new Date(),
      },
      { new: true }
    ).select('-password');
  }

  public async updateLastActiveStatus(userId: string, online: boolean): Promise<IUser | null> {
    return await User.findByIdAndUpdate(
      userId,
      {
        'status.online': online,
        'status.lastActive': new Date(),
      },
      { new: true }
    ).select('-password');
  }

  public async getUserActivity(userId: string) {
    const user = await User.findById(userId)
      .populate({
        path: 'threads',
        select: 'title createdAt'
      })
      .populate({
        path: 'posts',
        select: 'content action threadId createdAt ',
        populate: { path: 'threadId', select: 'title' }
      })
      .populate({
        path: 'gamesShared',
        select: 'title description images fileUrl externalLinks createdAt downloadCount viewCount tags categories averageRating version newRelease changelog'
      })
      .lean();

    if (!user) {
      throw new Error('User not found');
    }

    return {
      threads: user.threads,
      posts: (user.posts || []).map((post: any) => ({
        _id: post._id,
        content: post.content,
        action: post.action,
        threadTitle: post.threadId ? post.threadId.title : 'Unknown',
        createdAt: post.createdAt,
      })),
      games: user.gamesShared,
    };
  }

  public async updateAvatar(userId: string, avatarUrl: string): Promise<void> {
    const user = await User.findByIdAndUpdate(
      userId,
      { 'profile.avatarUrl': avatarUrl },
      { new: true }
    );

    if (!user) {
      throw new Error('User not found');
    }
  }
}

export default new UserService();
