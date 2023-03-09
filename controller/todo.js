import * as todoRepository from '../data/todo.js';
import { todoToTodoResponseDto } from '../mapped/todo.js';

export const getList = async (_reqeust, response) => {
	const list = await todoRepository.findAll();
	const mapList = list.map((todo) => todoToTodoResponseDto(todo));
	return response.status(200).json({ list: mapList });
};

export const createList = async (reqeust, response) => {
	const { userId, content } = reqeust.body;

	try {
		const todo = await todoRepository.save({ userId, content });
		const mapTodo = todoToTodoResponseDto(todo);

		return response.status(201).json(mapTodo);
	} catch (error) {
		return response.status(400).json({ message: error.message });
	}
};

export const updateList = async (reqeust, response) => {
	const { id } = reqeust.params;
	const { content } = reqeust.body;
	const todo = await todoRepository.updateById({ id, content });
	const todoResponse = todoToTodoResponseDto(todo);

	return response.status(200).json(todoResponse);
};

export const deleteList = async (reqeust, response) => {
	const { id } = reqeust.params;
	await todoRepository.deleteById(id);

	return response.sendStatus(204);
};
