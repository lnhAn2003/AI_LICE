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

    public async getPost(): Promise<IPost[]> {
        return await Post.find();
    }

    public async getPostById(id: string): Promise<IPost | null> {
        return await Post.findById(id);
    }

    public async updatePost(id: String, updateData: Partial<IPost>): Promise<IPost | null> {
        return await Post.findByIdAndUpdate(id, updateData, { new: true })
    }

    public async deletePost(id: string): Promise<IPost | null>{
        const post = await Post.findById(id);
        if (!post) {
            return null;
        }
        await User.findByIdAndUpdate(post.authorId, {
            $pull: { posts: post._id}
        })

        await Thread.findByIdAndUpdate(post.threadId, {
            $pull: { posts: post._id}
        })
        return await Post.findByIdAndDelete(id);
    }
}