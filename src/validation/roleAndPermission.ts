
import { z } from "zod";

export const createRoleSchema = z.object({
    name: z.string().min(3, "Role name must be at least 3 characters"),
    permissions: z.array(z.string().min(1, "Permission ID cannot be empty")),
});

export const getRoleByNameSchema = z.object({
    name: z.string().min(3, "Role name must be at least 3 characters"),

});

export const createPermissionSchema = z.object({
    name: z.string().min(3, "Permission name must be at least 3 characters"),
    action: z.string().min(3, "Action name must be valid and at least 3 characters"),
});

export const getPermissionByNameSchema = z.object({
    slug: z.string().min(3, "Permission name must be at least 3 characters")
});


