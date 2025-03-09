import UserModel from "@model/user";
import { IUser } from "types/user";

export class UserRepository {

    private async save(userInput: Partial<IUser>, isNew: boolean = true): Promise<any> {
        const user = new UserModel(userInput);
        user.isNew = isNew;
        return (await user.save()).toObject();
    }

    async create(user: IUser): Promise<IUser> {
        return this.save(user);
    }

    async findById(id: string): Promise<IUser | null> {
        return UserModel.findById(id).lean();
    }
    async findByName(name: string): Promise<IUser | null> {
        return UserModel.findOne({ name }).lean();
    }

    async findByPhone(phone: number): Promise<IUser | null> {
        return UserModel.findOne({ phone }).lean();
    }

    async findUser(name: string, phone: number): Promise<IUser | null> {
        return UserModel.findOne({ name, phone }).lean();
    }

    async update(user: IUser): Promise<IUser> {
        return this.save(user, false);
    }

    async delete(id: string): Promise<void> {
        await UserModel.findByIdAndDelete(id);
    }
}
