import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "types/user";

const UserSchema: Schema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: Number,
            required: true,
            unique: true,
            minlength: 10,
            maxlength: 10
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);



const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
