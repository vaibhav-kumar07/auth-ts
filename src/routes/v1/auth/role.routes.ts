import { Router } from "express";
import * as rediController from "@controller/role-controller";
import { authorizeRole } from "@middleware/authorizer.middleware";
import { tryCatchHandler } from "@middleware/error.middleware";
import { validateRequest } from "@middleware/validateRequest";
import { createRoleSchema, getRoleByNameSchema } from "@validation/roleAndPermission";

const router = Router();

router.post("/", authorizeRole(["admin"]), validateRequest(createRoleSchema), tryCatchHandler(rediController.createRole));
router.get("/", authorizeRole(["admin"]), tryCatchHandler(rediController.getAllRoles));
router.get("/:name", authorizeRole(["admin"]), validateRequest(getRoleByNameSchema), tryCatchHandler(rediController.getRoleByname));

export default router;
