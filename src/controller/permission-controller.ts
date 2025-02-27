import { NextFunction, Request, Response } from "express";
import PermissionService from "@service/permission-service";

const permissionService = new PermissionService();

// ✅ Create a new permission
export const createPermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, action } = req.body;
        const permission = await permissionService.createPermission({ name, action });
        return res.status(201).json({ success: true, data: permission });
    } catch (error) {
        next()
    }
};

// ✅ Get all permissions
export const getAllPermissions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const permissions = await permissionService.getAllPermissions();
        return res.status(200).json({ success: true, data: permissions });
    } catch (error) {
        next()
    }
};

export const getPermissionBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Received slug:", req.params.slug);
        const permission = await permissionService.getPermissionbyName(req.params.slug);
        return res.status(200).json({ success: true, data: permission });
    } catch (error) {
        next(error);
    }
};
