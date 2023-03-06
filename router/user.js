import express from "express";

import * as userController from "../controller/user.js";
import authValidation from "../middleware/validation/authValidation.js";

const router = express.Router();

// 로그인 login
router.post("/login", userController.login);

// 회원가입 signup
router.post("/register", authValidation.signup, userController.register);

// 인증 auth
router.get("/me", userController.me);

router.get("/", userController.getUsers);
export default router;
