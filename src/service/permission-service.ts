import { PermissionRepository } from "../database/repositories/permission-repo";
import { throwBusinessError } from "../utils/error.utils";
import { IPermission } from "../types/permission";

export default class PermissionService {
    private permissionRepository = new PermissionRepository();

    // ✅ Create a new permission (stores in Redis too)
    async createPermission(permission: IPermission): Promise<IPermission> {
        const existingPermission = await this.permissionRepository.findByName(permission.name);
        throwBusinessError(!!existingPermission, "Permission already exists")
        const foundPermission = await this.permissionRepository.create(permission);
        return foundPermission;
    }

    // ✅ Get all permissions (first from Redis, fallback to DB)
    async getAllPermissions(): Promise<IPermission[]> {
        return await this.permissionRepository.getAll();;
    }

    async getPermissionbyName(name: string): Promise<IPermission> {
        const foundPermission = await this.permissionRepository.findByName(name);
        throwBusinessError(!foundPermission, "Permission not found ")
        return foundPermission as IPermission;
    }

    // // ✅ Delete a permission
    // async deletePermission(name: string): Promise<void> {
    //     const permission = await this.permissionRepository.findByName(name);
    //     if (!permission) throw new Error("Permission not found");

    //     await this.permissionRepository.delete(permission._id);
    //     await PermissionRedisUtils.deletePermission(name);
    // }
}
