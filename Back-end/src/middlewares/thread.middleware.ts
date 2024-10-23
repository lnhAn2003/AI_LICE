import { Request, Response, NextFunction } from 'express';
import Thread from '../models/thread.model';

export interface threadUserRequest extends Request {
    user?: any;
    thread?: any;
};

export const checkThreadOwner = async (req: threadUserRequest, res: Response, next: NextFunction) => {
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

        if (req.thread.authorId.toString() !== req.user.id) {
            res.status(403).json({ message: 'You do not own this thread' });
            return; 
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};