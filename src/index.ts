import "tsconfig-paths/register";
import express, { Request, Response, NextFunction } from "express";
import v1AuthRoutes from "./routes/v1/auth/auth.routes";
import v1RoleRoutes from "./routes/v1/auth/role.routes";
import v1PermissionRoutes from "./routes/v1/auth/permission.routes";
import CommonVariables from "./config/index";
import MongoDB from "./database/implementations/mongo/connection";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

// Initialize common environment variables
CommonVariables.Initiate();

// Get PORT from environment variables
const PORT = CommonVariables.PORT;

// Connect to MongoDB
MongoDB.connect();

// Middleware for parsing JSON requests
app.use(express.json());

// Health check route
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "✅ Auth Service is running" });
});

// API Routes
app.use("/api/v1/auth", v1AuthRoutes);
app.use("/api/v1/roles", v1RoleRoutes);
app.use("/api/v1/permissions", v1PermissionRoutes);

// Global error handler
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Auth Service running on port ${PORT}`);
});
