import PermissionModel from "@model/permission";
import { IPermission } from "types/permission";

export class PermissionRepository {

    private async save(permissionInput: Partial<IPermission>, isNew: boolean = true): Promise<IPermission> {
        const role = new PermissionModel(permissionInput);
        role.isNew = isNew;
        return (await role.save()).toObject();
    }

    // ✅ Create a new permission
    async create(permission: IPermission): Promise<IPermission> {
        return this.save(permission);
    }

    // ✅ Fetch all permissions
    async getAll(): Promise<IPermission[]> {
        return PermissionModel.find().lean();
    }

    // ✅ Find a permission by ID
    async findById(id: string): Promise<IPermission | null> {
        return PermissionModel.findById(id).lean();
    }

    // ✅ Find a permission by name
    async findByName(name: string): Promise<IPermission | null> {
        return PermissionModel.findOne({ name }).lean();
    }

    // ✅ Delete a permission by ID
    async delete(id: string): Promise<void> {
        await PermissionModel.findByIdAndDelete(id);
    }
}
