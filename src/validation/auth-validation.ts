import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(10, "Phone number must not exceed 10 digits")
        .regex(/^\d+$/, "Phone number must contain only digits"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .max(20, "Password must not exceed 20 characters"),
    role: z.enum(["owner", "member", "admin"], {
        message: "Role must be either 'owner', 'member', or 'admin'",
    }),
});

export const loginSchema = z.object({
    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(10, "Phone number must not exceed 10 digits")
        .regex(/^\d+$/, "Phone number must contain only digits"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const changePasswordSchema = z.object({
    oldPassword: z.string().min(6, "Old password must be at least 6 characters long"),
    newPassword: z
        .string()
        .min(6, "New password must be at least 6 characters long")
        .max(20, "New password must not exceed 20 characters"),
});
