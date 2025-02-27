import { IPermission } from "types/permission";
import mongoose, { Schema, Document } from "mongoose";


const PermissionSchema = new Schema<IPermission>({
    name: { type: String, required: true, unique: true },
    action: { type: String, required: true, unique: true },
}, { timestamps: true });

export default mongoose.model<IPermission>("Permission", PermissionSchema);
