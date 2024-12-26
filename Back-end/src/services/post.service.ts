import Thread, { IThread } from "../models/thread.model";
import User, { IUser } from "../models/user.model";
import Post, { IPost } from "../models/post.model";
import { fileUpload } from "../utils/awsS3";

class PostService {
  public async createPost(
    postData: Partial<IPost>,
    file?: { buffer: Buffer; mimeType: string },
    images?: { buffer: Buffer; mimeType: string }[]
  ): Promise<IPost> {
    const folder = `posts/${postData.threadId || Date.now()}`;

    const fileUrl = file
      ? await fileUpload(file.buffer, `${folder}/files`, `${postData.threadId || Date.now()}_file`, file.mimeType)
      : undefined;

    const imageUrls = images
      ? await Promise.all(
          images.map((image, index) =>
            fileUpload(image.buffer, `${folder}/images`, `image-${index + 1}.jpg`, image.mimeType)
          )
        )
      : [];

    const post = new Post({
      ...postData,
      fileUrl,
      images: imageUrls,
    });

    const savedPost = await post.save();

    if (postData.authorId) {
      await User.findByIdAndUpdate(postData.authorId, {
        $push: { posts: savedPost._id },
      });
    }

    if (postData.threadId) {
      await Thread.findByIdAndUpdate(postData.threadId, {
        $push: { posts: savedPost._id },
      });
    }

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
        { path: 'authorId', select: 'username profile.avatarUrl' },
        {
          path: 'threadId',
          match: { isVisible: true },
          options: { sort: { createdAt: -1 } },
          populate: [
            { path: 'authorId', select: 'username profile.avatarUrl' }
          ]
        },
        {
          path: 'comments',
          match: { isVisible: true, parentCommentId: null },
          options: { sort: { createdAt: -1 } },
          populate: [
            { path: 'authorId', select: 'username profile.avatarUrl' },
            {
              path: 'replies',
              match: { isVisible: true },
              options: { sort: { createdAt: -1 } },
              populate: { path: 'authorId', select: 'username profile.avatarUrl' },
            },
          ],
        },
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

  public async updatePost(
    id: string,
    updateData: Partial<IPost>,
    file?: { buffer: Buffer; mimeType: string },
    images?: { buffer: Buffer; mimeType: string }[]
  ): Promise<IPost | null> {
    const post = await Post.findById(id);
    if (!post) {
      throw new Error("Post not found");
    }

    const folder = `posts/${post.threadId || id}`;

    if (file) {
      const fileUrl = await fileUpload(
        file.buffer,
        `${folder}/files`,
        `${post.threadId || 'post'}_file`,
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
      updateData.images = [...(post.images || []), ...imageUrls];
    }

    return await Post.findByIdAndUpdate(id, updateData, { new: true });
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

  public async incrementViewCount(id: string): Promise<void> {
      await Post.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });
    }

}

export default new PostService();