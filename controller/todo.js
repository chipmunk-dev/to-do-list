import * as todoRepository from "../data/todo.js";

export const getList = (reqeust, response) => {
	const list = todoRepository.findAll();
	return response.status(200).json({ list });
};

export const createList = (reqeust, response) => {
	const { userId, text } = reqeust.body;

	try {
		const todo = todoRepository.save({ userId, text });

		return response.status(201).json(todo);
	} catch (error) {
		return response.status(401).json({ message: error.message });
	}
};

export const updateList = (reqeust, response) => {};

export const deleteList = (reqeust, response) => {};
