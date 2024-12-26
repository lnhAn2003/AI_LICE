import Thread, { IThread } from "../models/thread.model";
import User from "../models/user.model";
import { fileUpload } from "../utils/awsS3";

class ThreadService {
    public async createThread(
        threadData: Partial<IThread>,
        file?: { buffer: Buffer; mimeType: string },
        images?: { buffer: Buffer; mimeType: string }[]
      ): Promise<IThread> {
        const folder = `threads/${threadData.authorId || Date.now()}`;
    
        const fileUrl = file
          ? await fileUpload(file.buffer, `${folder}/files`, `${threadData.title || Date.now()}_file`, file.mimeType)
          : undefined;
    
        const imageUrls = images
          ? await Promise.all(
              images.map((image, index) =>
                fileUpload(image.buffer, `${folder}/images`, `image-${index + 1}.jpg`, image.mimeType)
              )
            )
          : [];
    
        const thread = new Thread({
          ...threadData,
          fileUrl,
          images: imageUrls,
        });
    
        const savedThread = await thread.save();
    
        if (threadData.authorId) {
          await User.findByIdAndUpdate(threadData.authorId, {
            $push: { threads: savedThread._id },
          });
        }
    
        return savedThread;
      }

    public async getThreads(): Promise<IThread[]> {
        return await Thread.find()
            .populate({ path: 'authorId', select: 'username profile.avatarUrl' })
            .populate({ path: 'posts', select: 'content images fileUrl ' });

    }

    public async getThreadById(id: string): Promise<IThread | null> {
        return await Thread.findById(id)
            .populate({
                path: 'authorId',
                select: 'username profile.avatarUrl',
            })
            .populate({
                path: 'posts', 
                select: 'content createdAt images fileUrl',
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
                            {
                                path: 'authorId', 
                                select: 'username profile.avatarUrl', 
                            },
                            {
                                path: 'replies',
                                match: { isVisible: true },
                                options: { sort: { createdAt: -1 } }, 
                                populate: {
                                    path: 'authorId', 
                                    select: 'username profile.avatarUrl', 
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

    public async updateThread(
        id: string,
        updateData: Partial<IThread>,
        file?: { buffer: Buffer; mimeType: string },
        images?: { buffer: Buffer; mimeType: string }[]
      ): Promise<IThread | null> {
        const thread = await Thread.findById(id);
        if (!thread) {
          throw new Error("Thread not found");
        }
    
        const folder = `threads/${thread.authorId || id}`;
    
        if (file) {
          const fileUrl = await fileUpload(
            file.buffer,
            `${folder}/files`,
            `${thread.title || "thread"}_file`,
            file.mimeType
          );
          updateData.fileUrl = fileUrl;
        }
    
        if (images && images.length > 0) {
          const imageUrls = await Promise.all(
            images.map((image, index) =>
              fileUpload(image.buffer, `${folder}/images`, `image-${index + 1}.jpg`, image.mimeType)
            )
          );
          updateData.images = [...(thread.images || []), ...imageUrls];
        }
    
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

    public async incrementViewCount(id: string): Promise<void> {
        await Thread.findByIdAndUpdate(id, { $inc: { views: 1 } }).exec();
    }
}

export default new ThreadService();
