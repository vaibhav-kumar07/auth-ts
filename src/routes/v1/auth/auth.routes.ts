import express from 'express';
import { validateRequest } from '@middleware/validateRequest';
import { changePasswordSchema, loginSchema, registerSchema } from "@validation/auth-validation";
import * as AuthController from "@controller/auth-controller"
import { authenticate } from '@middleware/authorizer.middleware';

const router = express.Router();


router.post('/register', validateRequest(registerSchema), AuthController.Register);
router.post("/login", validateRequest(loginSchema), AuthController.Login);
router.post("/logout", authenticate, AuthController.Logout);
router.post("/change-password", authenticate, validateRequest(changePasswordSchema), AuthController.ChangePassword);

export default router;
