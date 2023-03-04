import express from "express";

import * as todoController from "../controller/todo.js";

const router = express.Router();

router.get("/", todoController.getList);
router.post("/", todoController.createList);
router.put("/:id", todoController.updateList);
router.delete("/:id", todoController.deleteList);

export default router;
