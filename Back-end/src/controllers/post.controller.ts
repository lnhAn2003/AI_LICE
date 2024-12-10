import { Request, Response } from "express";
import PostService from "../services/post.service";
import mongoose from "mongoose";

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
    
          if (!req.body.content || !req.body.threadId) {
            res.status(400).json({ message: "Content and Thread ID are required." });
            return;
          }
    
          // If there are images, get their S3 locations
          const imageFiles = (files["images"] as Express.Multer.File[]).map(file => {
            const s3File = file as Express.MulterS3File;
            return s3File.location;
          });
          const imageUrls = imageFiles ? imageFiles.map(file => file.location) : [];
    
          // Prepare post data with the images already included
          const postData = {
            content: req.body.content,
            authorId,
            threadId: new mongoose.Types.ObjectId(req.body.threadId),
            images: imageUrls, // S3 URLs directly
            createdAt: new Date(),
            updatedAt: new Date(),
          };
    
          const post = await PostService.createPost(postData);
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
            else res.status(200).json(post);
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

            const post = await PostService.updatePost(req.params.id, req.body);
            if (!post) {
                res.status(404).json({ message: 'Post not found' });
            } else {
                res.status(200).json(post);
            }
        } catch (error: any) {
            res.status(400).json({ message: error.message });
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
}

export default new PostController();
