import RoleModel from "../../model/role";
import { IRole } from "../../types/role";

export class RoleRepository {

    private async save(roleInput: Partial<IRole>, isNew: boolean = true): Promise<IRole> {
        const role = new RoleModel(roleInput);
        role.isNew = isNew;
        return (await role.save()).toObject();
    }

    async create(role: IRole): Promise<IRole> {
        return this.save(role);
    }

    async get(): Promise<IRole[]> {
        return RoleModel.find()
    }
    async findById(id: string): Promise<IRole | null> {
        return RoleModel.findById(id).populate("permissions").lean();
    }

    async findByName(name: string): Promise<IRole | null> {
        return RoleModel.findOne({ name }).populate("permissions").lean();
    }

    // async update(role: IRole): Promise<IRole> {
    //     return this.save(role, false);
    // }

    // async delete(id: string): Promise<void> {
    //     await RoleModel.findByIdAndDelete(id);
    // }
}
