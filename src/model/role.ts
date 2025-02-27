import { IRole } from "types/role";
import mongoose, { Schema, Document } from "mongoose";



const RoleSchema = new Schema<IRole>({
    name: { type: String, required: true, unique: true },
    permissions: [{ type: String }],
}, { timestamps: true });

export default mongoose.model<IRole>("Role", RoleSchema);
