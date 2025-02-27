
import UserModel from "@model/user";
import { IUser } from "types/user";

export class UserRepository {

    private async save(userInput: Partial<IUser>, isNew: boolean = true): Promise<IUser> {
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

    async findByEmail(email: string): Promise<IUser | null> {
        return UserModel.findOne({ email }).lean();
    }

    async update(user: IUser): Promise<IUser> {
        return this.save(user, false);
    }

    async delete(id: string): Promise<void> {
        await UserModel.findByIdAndDelete(id);
    }
}
