import { Request, Response, NextFunction } from 'express';
import RoleService from '../services/role.service';

export interface roleUserRequest extends Request {
    user?: any;
};

export const checkRoleAndPermission = (requiredRole: string, requiredPermission: string) => {
    return async (req: roleUserRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { roleId } = req.user;

            const role = await RoleService.getRoleById(roleId);
            const hasPerm = await RoleService.hasPermission(roleId, requiredPermission);

            if (role && role.name === requiredRole && hasPerm) {
                return next();
            } else {
                res.status(403).json({ message: 'Forbidden: You do not have the required role or permission.' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
};
