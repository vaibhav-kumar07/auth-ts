import { IUser } from "types/user";
import { throwBusinessError } from "../utils/error.utils";
import { ComparePassword, generateToken, HashedPassword } from "../utils/helper";
import { UserRepository } from "@database/repositories/user-repo";
import RoleRedisUtils from "@utils/role.redis";



export default class AuthService {
    private _userRepository = new UserRepository();

    async register(userData: Partial<IUser>) {
        const { name, email, password, role } = userData;

        // Check if the email is already registered
        const existingUser = await this._userRepository.findByEmail(email as string);
        throwBusinessError(!!existingUser, "User already exists with this email.");

        // Hash the password
        const hashedPassword = await HashedPassword(password as string);

        // Create the user
        const newUser = await this._userRepository.create({
            name,
            email,
            password: hashedPassword,
            role,
        } as IUser);

        const token = generateToken({ _id: newUser._id?.toString() as string, role: newUser.role });

        return { _id: newUser._id, token };
    }


    async login(userData: Partial<IUser>) {
        const { email, password } = userData;

        // Find user by email
        const user = await this._userRepository.findByEmail(email as string);
        throwBusinessError(!user, "Invalid email or password");

        // Check password
        const isValidPassword = await ComparePassword(password as string, user?.password as string);
        throwBusinessError(!isValidPassword, "Invalid email or password");

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
        throwBusinessError(!user, "User not found");

        // Verify old password
        const isMatch = await ComparePassword(oldPassword, user?.password as string);
        throwBusinessError(!isMatch, "Incorrect old password");

        // Hash and update new password
        user!.password = await HashedPassword(newPassword);
        await this._userRepository.update(user as IUser);
    }
}
