import { Request, Response } from "express";
import PostService from "../services/post.service";
import mongoose from "mongoose";
import notificationService from "../services/notification.service";

export interface AuthRequest extends Request {
  user?: any;
}

export interface MulterFiles {
  [fieldname: string]: Express.Multer.File[];
}

class PostController {
  public async createPost(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = req.user as { id: string };
      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const authorId = new mongoose.Types.ObjectId(user.id);
      const files = req.files as MulterFiles;

      const imageFiles = files?.['images'] || [];
      const postFile = files?.['file']?.[0];

      const imageData = imageFiles.map((img: Express.Multer.File) => ({
        buffer: img.buffer,
        mimeType: img.mimetype,
      }));

      const fileData = postFile
        ? {
          buffer: postFile.buffer,
          mimeType: postFile.mimetype,
        }
        : undefined;


      const { threadId, ...restBody } = req.body;

      if (!threadId || typeof threadId !== 'string' || !mongoose.Types.ObjectId.isValid(threadId)) {
        res.status(400).json({ message: "Invalid or missing threadId" });
        return;
      }

      const threadOId = new mongoose.Types.ObjectId(threadId);

      const postData = {
        ...restBody,
        authorId,
        threadId: threadOId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const post = await PostService.createPost(postData, fileData, imageData);

      const postId = new mongoose.Types.ObjectId(postData.id);
      await notificationService.createNotification({
        userId: authorId,
        type: "post_uploaded",
        referenceId: postId,
        referenceType: "Post",
        message: `You have created new post !`,
      });
      res.status(201).json(post);
    } catch (error: any) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: error.message });
    }
  }

  public async getPosts(req: Request, res: Response): Promise<void> {
    try {
      const posts = await PostService.getPosts();
      res.status(200).json(posts);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async getPostById(req: Request, res: Response): Promise<void> {
    try {
      const post = await PostService.getPostById(req.params.id);
      if (!post) res.status(404).json({ message: 'Post not found' });
      else {
        await PostService.incrementViewCount(req.params.id);
        res.status(200).json(post);
      }
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async getPostsByUserId(req: Request, res: Response): Promise<void> {
    try {
      const posts = await PostService.getPostsByUserId(req.params.userId);
      res.status(200).json(posts);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async getPostsByThreadId(req: Request, res: Response): Promise<void> {
    try {
      const posts = await PostService.getPostsByThreadId(req.params.threadId);
      res.status(200).json(posts);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async updatePost(req: AuthRequest, res: Response): Promise<void> {
    try {

      const user = req.user as { id: string };
      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const { id } = req.params;

      const existingPost = await PostService.getPostById(id);
      if (!existingPost) {
        res.status(404).json({ message: "Post not found" });
        return;
      }

      const files = req.files as MulterFiles | undefined;

      const fileData = files?.['file']?.[0]
        ? {
          buffer: files['file'][0].buffer,
          mimeType: files['file'][0].mimetype,
        }
        : undefined;

      const imageData = files?.['images']
        ? files['images'].map((img: Express.Multer.File) => ({
          buffer: img.buffer,
          mimeType: img.mimetype,
        }))
        : undefined;

      const updateData = {
        ...req.body,
        content: req.body.content,
      };

      const updatedPost = await PostService.updatePost(id, updateData, fileData, imageData);
      if (!updatedPost) {
        res.status(404).json({ message: "Post not found" });
        return;
      }

      const userId = new mongoose.Types.ObjectId(user.id);
      const postId = new mongoose.Types.ObjectId(updateData.id);
      await notificationService.createNotification({
        userId: userId,
        type: "post_updated",
        referenceId: postId, 
        referenceType: "Post",
        message: `You have updated your post !`,
      });

      res.status(200).json(updatedPost);
    } catch (error: any) {
      console.error("Error updating post:", error.message);
      res.status(500).json({ message: error.message });
    }
  }



  public async deletePost(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = req.user as { id: string };
      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const post = await PostService.deletePost(req.params.id);
      if (!post) res.status(404).json({ message: 'Post not found' });
      else res.status(200).json({ message: 'Post deleted' });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  public async incrementViewCount(req: Request, res: Response): Promise<void> {
    try {
      await PostService.incrementViewCount(req.params.id);
      res.status(200).json({ message: "Post view incremented" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new PostController();
