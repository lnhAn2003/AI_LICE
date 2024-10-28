import { Request, Response, NextFunction } from 'express';
import Comment from '../models/comment.model';
import RoleService from '../services/role.service';

export interface commentUserRequest extends Request {
    user?: {
        id: string;
        roleId: string;
    };
    comment?: any;
};

export const checkCommentOwner = async (req: commentUserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            res.status(404).json({ message: 'Comment not found' });
            return;
        }
        req.comment = Comment;

        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const { id: userId, roleId } = req.user;
        const isOwner = req.comment.authorId.toString() === userId;

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