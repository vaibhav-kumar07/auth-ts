import { NextFunction, Request, Response } from "express";
import RoleService from "../service/role-service";

const roleService = new RoleService();

export async function createRole(req: Request, res: Response, next: NextFunction) {
    const result = await roleService.createRole(req.body.name, req.body.permissions);
    res.status(201).json({ success: true, data: result });
}

export async function getAllRoles(req: Request, res: Response, next: NextFunction) {
    const result = await roleService.getAllRoles();
    res.status(200).json({ success: true, data: result });
}

export async function getRoleByname(req: Request, res: Response) {
    const result = await roleService.getRoleByName(req.params.name);
    res.status(200).json({ success: true, data: result });
}

