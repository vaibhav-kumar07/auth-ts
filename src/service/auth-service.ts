import { IUser } from "../types/user";
import { throwBusinessError } from "../utils/error.utils";
import { ComparePassword, generateToken, HashedPassword } from "../utils/helper";
import { UserRepository } from "../database/repositories/user-repo";
import RoleRedisUtils from "../utils/role.redis";



export default class AuthService {
    private _userRepository = new UserRepository();

    async register(userData: Partial<IUser>) {
        const { name, phone, password, role } = userData;

        // Check if the phone is already registered
        const existingUser = await this._userRepository.findUser(name as string, phone as number);
        throwBusinessError(!!existingUser, "User already exists with this phone number or name");

        // Hash the password
        const hashedPassword = await HashedPassword(password as string);

        // Create the user
        const newUser = await this._userRepository.create({
            name,
            phone,
            password: hashedPassword,
            role,
        } as IUser);

        const token = generateToken({ _id: newUser._id?.toString() as string, role: newUser.role });
        return { user: { name: newUser.name, role: newUser.role }, token };
    }


    async login(userData: Partial<IUser>) {
        const { phone, password } = userData;

        // Find user by phone
        const user = await this._userRepository.findByPhone(phone as number);
        throwBusinessError(!user, "Invalid Phone Number or password");

        // Check password
        const isValidPassword = await ComparePassword(password as string, user?.password as string);
        throwBusinessError(!isValidPassword, "Invalid Phone Number or Password");

        // Generate JWT token
        const token = generateToken({ _id: user?._id?.toString() as string, role: user?.role as string });

        await RoleRedisUtils.setUserRole(user?._id?.toString() as string, user!.role);
        return { _id: user?._id, token };
    }

    async logout(userId: string) {
        await RoleRedisUtils.removeUserRole(userId);
    }

    async changePassword(userId: string, passwords: { oldPassword: string; newPassword: string }) {
        const { oldPassword, newPassword } = passwords;

        // Find user by ID
        const user = await this._userRepository.findById(userId);
        throwBusinessError(!user, "User Not found");

        // Verify old password
        const isMatch = await ComparePassword(oldPassword, user?.password as string);
        throwBusinessError(!isMatch, "Incorrect old Password");

        // Hash and update new password
        user!.password = await HashedPassword(newPassword);
        await this._userRepository.update(user as IUser);
    }
}
