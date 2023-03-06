import { validationResult } from "express-validator";

export const resultOfValidation = (req, res, next) => {
	const result = validationResult(req);
	const errors = result?.errors;

	if (errors && errors.length) {
		const messages = errors.map(error => ({
			msg: error.msg,
			param: error.param,
		}));
		return res.status(401).json({ errors: messages });
	} else {
		next();
	}
};
