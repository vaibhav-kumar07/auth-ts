import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email format"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(20, "Password must not exceed 20 characters"),
    role: z.enum(["owner", "member", "admin"], {
        message: "Role must be either 'owner' or 'member' or 'admin'",
    }),
});


export const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const changePasswordSchema = z.object({
    oldPassword: z.string().min(6, "Old password must be at least 6 characters long"),
    newPassword: z
        .string()
        .min(6, "New password must be at least 6 characters long")
        .max(20, "Password must not exceed 20 characters"),
});
