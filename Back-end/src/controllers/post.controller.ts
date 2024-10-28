import { Request, Response } from "express";
import PostService from "../services/post.service";
import mongoose from "mongoose";

export interface AuthRequest extends Request {
    user?: any;
}

class PostController {
    public async createPost(req: AuthRequest, res: Response): Promise<void> {
        try {
            const user = req.user as { id: string };
            if (!user) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }

            const authorId = new mongoose.Types.ObjectId(user.id);
            const postData = {
                authorId: authorId,
                threadId: new mongoose.Types.ObjectId(req.body.threadId),
                content: req.body.content,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            const post = await PostService.createPost(postData);
            res.status(201).json(post);
        } catch (error: any) {
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
