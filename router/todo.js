import express from "express";

import * as todoController from "../controller/todo.js";
import isAuth from "../middleware/isAuth.js";
import todoValidation from "../middleware/validation/todoValidation.js";

const router = express.Router();

router.get("/", isAuth, todoController.getList);
router.post(
	"/",
	isAuth,
	todoValidation.createOrUpdate,
	todoController.createList
);
router.put(
	"/:id",
	isAuth,
	todoValidation.createOrUpdate,
	todoController.updateList
);
router.delete(
	"/:id",
	isAuth,
	todoValidation.findOneOrDelete,
	todoController.deleteList
);

export default router;
