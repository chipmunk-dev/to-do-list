import * as todoRepository from "../data/todo.js";

export const createList = (reqeust, response) => {
	const { userId, text } = reqeust.body;

	try {
		const todo = todoRepository.save({ userId, text });

		return response.status(201).json(todo);
	} catch (error) {
		return response.status(401).json({ message: error.message });
	}
};
export const getList = (reqeust, response) => {};
export const updateList = (reqeust, response) => {};
export const deleteList = (reqeust, response) => {};
