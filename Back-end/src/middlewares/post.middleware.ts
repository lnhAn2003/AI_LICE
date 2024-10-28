import { Request, Response, NextFunction } from 'express';
import Post from '../models/post.model';
import RoleService from '../services/role.service';

export interface postUserRequest extends Request {
    user?: {
        id: string;
        roleId: string;
    };
    post?: any;
};

export const checkPostOwner = async (req: postUserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        req.post = Post;

        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const { id: userId, roleId } = req.user;
        const isOwner = req.post.authorId.toString() === userId;

        const role = await RoleService.getRoleById(roleId);
        const isAdmin = role && role.name === 'Admin';

        if (isOwner || isAdmin) {
            return next();
        } else {
            res.status(403).json({ message: 'Forbidden: You do not own this resource.' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};