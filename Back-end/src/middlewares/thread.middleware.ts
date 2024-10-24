import { Request, Response, NextFunction } from 'express';
import Thread from '../models/thread.model';
import RoleService from '../services/role.service';

export interface threadUserRequest extends Request {
    user?: {
        id: string;
        roleId: string;
    };
    thread?: any;
};

export const checkThreadOwner = async (req: threadUserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const thread = await Thread.findById(req.params.id);
        if (!thread) {
            res.status(404).json({ message: 'Thread not found' });
            return;
        }
        req.thread = thread;

        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const { id: userId, roleId } = req.user;
        const isOwner = req.thread.authorId.toString() === userId;

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