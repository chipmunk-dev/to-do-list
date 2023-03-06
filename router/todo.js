import express from "express";

import * as todoController from "../controller/todo.js";
import todoValidation from "../middleware/validation/todoValidation.js";

const router = express.Router();

router.get("/", todoController.getList);
router.post("/", todoValidation.createOrUpdate, todoController.createList);
router.put("/:id", todoValidation.createOrUpdate, todoController.updateList);
router.delete(
	"/:id",
	todoValidation.findOneOrDelete,
	todoController.deleteList
);

export default router;
