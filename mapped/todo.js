export const todoToTodoResponseDto = (todo) => {
	if (!todo) return null;

	const { id, content, complete, userId } = todo;
	const todoResponse = { id, content, complete, userId };

	return todoResponse;
};
