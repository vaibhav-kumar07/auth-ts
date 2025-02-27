import "tsconfig-paths/register";
import express from "express";
import v1AuthRoutes from "@routes/v1/auth/auth.routes"
import v1RoleRoutes from "@routes/v1/auth/role.routes"
import v1PermssionRoutes from "@routes/v1/auth/permission.routes"
import CommonVariables from "@config/index";
import MongoDB from "@database/implementations/mongo/connection";
import { errorHandler } from "@middleware/error.middleware";

const app = express();
const PORT = CommonVariables.PORT;

MongoDB.connect();
app.use(express.json());
app.use("/api/v1/auth", v1AuthRoutes)
app.use("/api/v1/roles", v1RoleRoutes)
app.use("/api/v1/permissions", v1PermssionRoutes)

// app.use(routes);
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`🚀 Auth Service running on port ${PORT}`);
});
