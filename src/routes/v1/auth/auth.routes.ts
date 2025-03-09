import express from 'express';
import { validateRequest } from '@middleware/validateRequest';
import { changePasswordSchema, loginSchema, registerSchema } from "@validation/auth-validation";
import * as AuthController from "@controller/auth-controller"
import { authenticate } from '@middleware/authorizer.middleware';
import { tryCatchHandler } from '@middleware/error.middleware';

const router = express.Router();

router.post('/register', validateRequest(registerSchema), tryCatchHandler(AuthController.Register));
router.post("/login", validateRequest(loginSchema), tryCatchHandler(AuthController.Login))
router.post("/logout", authenticate, tryCatchHandler(AuthController.Logout));
router.post("/change-password", authenticate, validateRequest(changePasswordSchema), tryCatchHandler(AuthController.ChangePassword))

export default router;
