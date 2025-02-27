import { Request, Response, NextFunction } from "express";
import { ValidationError, BusinessError } from "../utils/error.utils";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ValidationError) {
        return res.status(400).json({
            status: false,
            error: "Validation Error",
            details: err.details,
        });
    }

    if (err instanceof BusinessError) {
        return res.status(400).json({
            status: false,
            error: err.message,
        });
    }

    console.error("Unexpected Error:", err);
    return res.status(500).json({
        status: false,
        error: "Something went wrong. Please try again later.",
    });
};



export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
