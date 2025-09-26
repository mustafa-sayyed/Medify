import { Router } from "express";
import validate from "../middlewares/validation.middleware.js";
import { loginUserSchema, registerUserSchema } from "../schemas/user.schema.js";
import authenticate from "../middlewares/auth.middleware.js";
import { currentUser, loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";

const router = Router();


router.route("/login").post(validate(loginUserSchema), loginUser)
router.route("/register").post(validate(registerUserSchema), registerUser)

// Authenticated Routes
router.route("/current-user").get(authenticate, currentUser)
router.route("/logout").post(authenticate, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);



export default router;