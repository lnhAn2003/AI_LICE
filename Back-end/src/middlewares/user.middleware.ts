import { Request, Response, NextFunction } from 'express';
import RoleService from '../services/role.service';

export interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        roleId: string;
    };
}

export const checkUserOwner = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const { id: userId, roleId } = req.user;
        
        if (req.params.id === userId) {
            return next();
        }

        const role = await RoleService.getRoleById(roleId);
        const isAdmin = role && role.name === 'Admin';

        if (isAdmin) {
            return next();
        } else {
            res.status(403).json({ message: 'Forbidden: You do not own this resource.' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
