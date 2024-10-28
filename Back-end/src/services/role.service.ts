import Role, { IRole } from "../models/role.model";

class RoleService {
    public async createRole( roleData: Partial<IRole>): Promise<IRole> {
        const role = new Role(roleData);
        const savedRole = await role.save();
        return savedRole;
    }

    async getRoles(): Promise<IRole[]> {
        return await Role.find();
    }

    async getRoleById(id: string): Promise<IRole | null> {
        return await Role.findById(id);
    }

    async updateRole(id: string, data: Partial<IRole>): Promise<IRole | null> {
        return await Role.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteRole(id: string): Promise<IRole | null> {
        return await Role.findByIdAndDelete(id);
    }

    async hasPermission(roleId: string, permission: string): Promise<boolean> {
        const role = await Role.findById(roleId);

        if (role) {
            return role.permission.includes(permission);
        }
        return false;
    }
}

export default new RoleService();