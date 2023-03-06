import { body } from "express-validator";
import { resultOfValidation } from "./resultOfValiation.js";

const commonRule = {
	user: [
		body("username")
			.trim()
			.isLength({ min: 4 })
			.withMessage("아이디는 4자 이상 입력합니다."),
		body("password")
			.trim()
			.isLength({ min: 6 })
			.withMessage("비밀번호는 6자 이상 입력합니다."),
	],
};

const validation = {
	signup: [...commonRule.user, resultOfValidation],
	login: [...commonRule.user, resultOfValidation],
};

export default validation;
