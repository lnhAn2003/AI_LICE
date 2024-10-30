import { Request, Response, NextFunction } from 'express';
import GameShared from '../models/gameshared.model';
import RoleService from '../services/role.service';

export interface gameUserRequest extends Request {
    user?: {
        id: string;
        roleId: string;
    };
    game?: any;
};

export const checkGameSharedOwner = async (req: gameUserRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const game = await GameShared.findById(req.params.id);
        if (!game) {
            res.status(404).json({ message: 'Game not found' });
            return;
        }
        req.game = GameShared;

        if (!req.user) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }

        const { id: userId, roleId } = req.user;
        const isOwner = req.game.authorId.toString() === userId;

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