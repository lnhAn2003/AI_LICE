import { Request, Response, NextFunction } from 'express';
import Course from '../models/course.model';
import RoleService from '../services/role.service';

export interface courseUserRequest extends Request {
    user?: {
        id: string;
        roleId: string;
    };
    course?: any;
};

export const checkCourseOwner = async (req: courseUserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            res.status(404).json({ message: 'Course not found' });
            return;
        }
        req.course = Course;

        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const { id: userId, roleId } = req.user;
        const isOwner = req.course.authorId.toString() === userId;

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