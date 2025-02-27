import { RoleRepository } from "@database/repositories/role-repo";
import RoleRedisUtils from "@utils/role.redis";
import PermissionModel from "@model/permission";
import { IRole } from "types/role";
import { BusinessError, throwBusinessError } from "@utils/error.utils";

export default class RoleService {
    private roleRepository = new RoleRepository();

    // ✅ Create a new role
    async createRole(name: string, permissions: string[]): Promise<IRole> {
        const existingRole = await this.roleRepository.findByName(name);
        if (existingRole) throw new Error("Role already exists");

        // ✅ Create role and store it in Redis
        const role = await this.roleRepository.create({ name, permissions });
        await RoleRedisUtils.setRolePermissions(name, permissions);
        return role;
    }



    async getAllRoles(): Promise<{ name: string; permissions: string[] }[]> {
        const cachedRoles = await RoleRedisUtils.getAllRoles();
        if (cachedRoles && cachedRoles.length > 0)
            return cachedRoles;

        // ✅ If Redis cache is empty, fetch from the database
        const dbRolesWithPermissions = await this.roleRepository.get();
        await RoleRedisUtils.setAllRolesInRedis(dbRolesWithPermissions);
        return dbRolesWithPermissions
    }

    async getRoleByName(name: string) {

        const foundRedisRole = await RoleRedisUtils.getUserRole(name)
        if (foundRedisRole) return foundRedisRole

        // ✅ If Redis cache is empty, fetch from the database
        const existingRole = await this.roleRepository.findByName(name);
        throwBusinessError(!existingRole, `Role doesnot exist with name: ${name}`)

        await RoleRedisUtils.setRolePermissions(name, existingRole?.permissions as string[])
        return existingRole


    }


    // ✅ Get permissions for a role (from Redis, fallback to DB)
    async getPermissionsByRole(role: string): Promise<string[]> {
        let permissions = await RoleRedisUtils.getRolePermissions(role);
        if (permissions.length === 0) {
            const roleData = await this.roleRepository.findByName(role);
            if (!roleData) return [];

            permissions = roleData.permissions.map((perm: any) => perm.name);
            await RoleRedisUtils.setRolePermissions(role, permissions);
        }
        return permissions;
    }

    // ✅ Add permission to a role
    async addPermissionToRole(role: string, permission: string): Promise<void> {
        await RoleRedisUtils.addPermissionToRole(role, permission);
    }

    // ✅ Remove permission from a role
    async removePermissionFromRole(role: string, permission: string): Promise<void> {
        await RoleRedisUtils.removePermissionFromRole(role, permission);
    }

    // ✅ Check if role has a specific permission
    async hasPermission(role: string, permission: string): Promise<boolean> {
        return RoleRedisUtils.hasPermission(role, permission);
    }


}
