
import { Request, Response } from "express"
import authService from "../service/auth-service";
const AuthService = new authService();

export async function Register(req: Request, res: Response) {
    try {
        const result = await AuthService.register(req.body)
        res.status(201).json({ success: true, data: result });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }

}



export async function Login(req: Request, res: Response) {
    try {
        const result = await AuthService.login(req.body);
        res.status(200).json({ success: true, data: result });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function Logout(req: Request, res: Response) {
    try {
        await AuthService.logout(req.body.loggedInUser._id);
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function ChangePassword(req: Request, res: Response) {
    try {
        await AuthService.changePassword(req.body.loggedInUser._id, req.body);
        res.status(200).json({ success: true, message: "Password changed successfully" });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}