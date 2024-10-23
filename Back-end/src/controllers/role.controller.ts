import { Request, Response } from 'express';
import RoleService from '../services/role.service';
import { IRole } from '../models/role.model';

class RoleController {
    public async createRole(req: Request, res: Response): Promise<void> {
        try {
            const { name, permission } = req.body;
            const newRole = await RoleService.createRole({ name, permission });
            res.status(201).json(newRole);
        } catch (error) {
            res.status(500).json({ message: 'Error creating role', error });
        }
    }

    public async getRoles(req: Request, res: Response): Promise<void> {
        try {
            const roles = await RoleService.getRoles();
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving roles', error });
        }
    }

    public async getRoleById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const role = await RoleService.getRoleById(id);

            if (role) {
                res.status(200).json(role);
            } else {
                res.status(404).json({ message: 'Role not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving role', error });
        }
    }

    public async updateRole(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedData: Partial<IRole> = req.body;

            const updatedRole = await RoleService.updateRole(id, updatedData);

            if (updatedRole) {
                res.status(200).json(updatedRole);
            } else {
                res.status(404).json({ message: 'Role not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating role', error });
        }
    }

    public async deleteRole(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const deletedRole = await RoleService.deleteRole(id);

            if (deletedRole) {
                res.status(200).json({ message: 'Role deleted successfully' });
            } else {
                res.status(404).json({ message: 'Role not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting role', error });
        }
    }
}

export default new RoleController();
