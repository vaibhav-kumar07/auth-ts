import { Router } from "express";
import { readdirSync } from "fs";
import { join } from "path";

const router = Router();
const routesPath = __dirname;

readdirSync(routesPath).forEach((file) => {
    if (file.endsWith(".routes.ts") && file !== "index.routes.ts") {
        const routeModule = require(join(routesPath, file)); // Use require()
        router.use(`/${file.replace(".routes.ts", "")}`, routeModule.default || routeModule);
    }
});

export default router;
