import { Router } from "express";
import * as permissionController from "@controller/permission-controller";
import { authorizeRole } from "@middleware/authorizer.middleware";
import { validateRequest } from "@middleware/validateRequest";
import { createPermissionSchema, createRoleSchema, getPermissionByNameSchema, } from "@validation/roleAndPermission";


const router = Router();

router.post("/", authorizeRole(["admin"]), validateRequest(createRoleSchema), permissionController.createPermission);
router.get("/", authorizeRole(["admin"]), permissionController.getAllPermissions);
router.get("/:slug", authorizeRole(["admin"]), validateRequest(createPermissionSchema), permissionController.getPermissionBySlug);


export default router;
