import Thread, { IThread } from "../models/thread.model";
import User from "../models/user.model";

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
            .populate({ path: 'authorId', select: 'username profile.avatarUrl' })
            .populate({ path: 'posts', select: 'content' });

    }

    public async getThreadById(id: string): Promise<IThread | null> {
        return await Thread.findById(id)
            .populate({
                path: 'authorId', // Populating thread's author details
                select: 'username profile.avatarUrl',
            })
            .populate({
                path: 'posts', // Populating posts within the thread
                select: 'content createdAt', // Selecting necessary fields
                populate: [
                    {
                        path: 'authorId', // Populating post authors
                        select: 'username profile.avatarUrl', // Selecting fields for post authors
                    },
                    {
                        path: 'comments', // Populating comments within each post
                        match: { isVisible: true, parentCommentId: null }, // Filtering comments
                        options: { sort: { createdAt: -1 } }, // Sorting comments by creation date
                        populate: [
                            {
                                path: 'authorId', // Populating comment authors
                                select: 'username profile.avatarUrl', // Selecting fields for comment authors
                            },
                            {
                                path: 'replies', // Populating replies within each comment
                                match: { isVisible: true }, // Filtering replies
                                options: { sort: { createdAt: -1 } }, // Sorting replies by creation date
                                populate: {
                                    path: 'authorId', // Populating reply authors
                                    select: 'username profile.avatarUrl', // Selecting fields for reply authors
                                },
                            },
                        ],
                    },
                ],
            });
    }

    public async getThreadsByUserId(userId: string): Promise<IThread[]> {
        return await Thread.find({ authorId: userId })
            .populate({ path: 'authorId', select: 'username profile.avatarURL' })
            .populate([
                {
                    path: 'posts',
                    select: 'content createdAt',
                    populate: [
                        {
                            path: 'authorId',
                            select: 'username profile.avatarUrl',
                        },
                        {
                            path: 'comments',
                            match: { isVisible: true, parentCommentId: null },
                            options: { sort: { createdAt: -1 } },
                            populate: [
                                { path: 'authorId', select: 'username' },
                                {
                                    path: 'replies',
                                    match: { isVisible: true },
                                    options: { sort: { createdAt: -1 } },
                                    populate: { path: 'authorId', select: 'username' },
                                },
                            ],
                        },
                    ]
                },

            ]);

    }

    public async updateThread(id: string, updateData: Partial<IThread>): Promise<IThread | null> {
        return await Thread.findByIdAndUpdate(id, updateData, { new: true });
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

    public async getVisibleThreads(): Promise<IThread[]> {
        return await Thread.find({ isVisible: true })
            .populate({ path: 'authorId', select: 'username profile.avatarURL' })
            .sort({ createdAt: -1 });
    }

    public async getPopularThreads(): Promise<IThread[]> {
        return await Thread.find()
            .sort({ views: -1 })
            .populate({ path: 'authorId', select: 'username' })
            .populate({ path: 'posts', select: 'content' })
            .limit(10);
    }

    public async getThreadsByTag(tag: string): Promise<IThread[]> {
        return await Thread.find({ tags: tag })
            .populate({ path: 'authorId', select: 'username' })
            .populate({ path: 'posts', select: 'content' });
    }

    public async softDeleteThread(id: string): Promise<IThread | null> {
        return await Thread.findByIdAndUpdate(
            id,
            { isVisible: false },
            { new: true }
        );
    }

    public async increaseViews(id: string): Promise<void> {
        await Thread.findByIdAndUpdate(id, { $inc: { views: 1 } }).exec();
    }
}

export default new ThreadService();
