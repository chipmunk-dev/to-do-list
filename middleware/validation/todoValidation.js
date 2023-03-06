import { body, param } from "express-validator";
import { resultOfValidation } from "./resultOfValiation.js";

const commonRule = {
	checkId: [param("id").notEmpty().withMessage("고유 id가 필요합니다.")],
	checkText: [
		body("text").trim().notEmpty().withMessage("내용이 비어있습니다."),
	],
};

const validation = {
	findOneOrDelete: [...commonRule.checkId, resultOfValidation],
	createOrUpdate: [...commonRule.checkText, resultOfValidation],
};

export default validation;
