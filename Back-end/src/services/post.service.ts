import mongoose from "mongoose";
import Thread, { IThread } from "../models/thread.model";
import User, { IUser } from "../models/user.model";
import Post, { IPost } from "../models/post.model";

class PostService {
    public async createPost(postData: Partial<IPost>): Promise<IPost> {
        const post = new Post(postData);
        const savedPost = await post.save();

        await User.findByIdAndUpdate(postData.authorId, {
            $push: { posts: savedPost._id }
        })

        await Thread.findByIdAndUpdate(postData.threadId, {
            $push: { posts: savedPost._id }
        })

        return savedPost;
    }

    public async getPosts(): Promise<IPost[]> {
        return await Post.find()
            .populate({ path: 'authorId', select: 'username' })
            .populate({ path: 'threadId', select: 'title' })
    }

    public async getPostById(id: string): Promise<IPost | null> {
        const post = await Post.findById(id)
            .populate([
                { path: 'authorId', select: 'username' },
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
                        }
                    ]
                }
            ])
        return post;
    }

    public async getPostsByUserId(userId: string): Promise<IPost[]> {
        return await Post.find({ authorId: userId })
            .populate({ path: 'authorId', select: 'username' })
            .populate({ path: 'threadId', select: 'title' });
    }

    public async getPostsByThreadId(threadId: string): Promise<IPost[]> {
        return await Post.find({ threadId: threadId })
            .populate({ path: 'authorId', select: 'username' })
            .populate({ path: 'threadId', select: 'title' });
    }

    public async updatePost(id: String, updateData: Partial<IPost>): Promise<IPost | null> {
        return await Post.findByIdAndUpdate(id, updateData, { new: true })
    }

    public async deletePost(id: string): Promise<IPost | null> {
        const post = await Post.findById(id);
        if (!post) {
            return null;
        }
        await User.findByIdAndUpdate(post.authorId, {
            $pull: { posts: post._id }
        })

        await Thread.findByIdAndUpdate(post.threadId, {
            $pull: { posts: post._id }
        })
        return await Post.findByIdAndDelete(id);
    }

}

export default new PostService();