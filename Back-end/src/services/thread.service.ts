import Thread, { IThread } from "../models/thread.model";
import User, { IUser } from "../models/user.model";
import Post, { IPost } from "../models/post.model";

class ThreadService {
    public async createThread(threadData: Partial<IThread>): Promise<IThread> {
        const thread = new Thread(threadData);
        const savedThread = await thread.save();

        await User.findByIdAndUpdate(threadData.authorId, {
            $push: { threads: savedThread._id }
        });

        return savedThread;
    }

    public async getThreads(): Promise<IThread[]> {
        return await Thread.find()
            .populate({ path: 'authorId', select: 'username' })
            .populate({ path: 'posts', select: 'content'});
    }

    public async getThreadById(id: string): Promise<IThread | null> {
        return await Thread.findById(id)
            .populate({ path: 'authorId', select: 'username' })
            .populate({ path: 'posts', select: 'content'});
    }

    public async updateThread(id: string, updateData: Partial<IThread>): Promise<IThread | null> {
        return await Thread.findByIdAndUpdate(id, updateData, { new: true})
    }

    public async deleteThread(id: string): Promise<IThread | null> {
        const thread = await Thread.findById(id);
        if (!thread) {
            return null;
        }
        await User.findByIdAndUpdate(thread.authorId, {
            $pull: { threads: thread._id }
        });
        return await Thread.findByIdAndDelete(id);
    }

    public async increaseViews(id: string): Promise<void> {
        await Thread.findByIdAndUpdate(id, { $inc: {views: 1}}).exec();
    }
}

export default new ThreadService();