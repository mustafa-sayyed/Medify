import { Router } from "express";
import validate from "../middlewares/validation.middleware.js";
import { loginUserSchema, registerUserSchema } from "../schemas/user.schema.js";
import authenticate from "../middlewares/auth.middleware.js";
import { currentUser, loginUser, registerUser } from "../controllers/user.controller.js";

const router = Router();


router.route("/login").post(validate(loginUserSchema), loginUser)
router.route("/register").post(validate(registerUserSchema), registerUser)
router.route("/current-user").get(authenticate, currentUser)



export default router;