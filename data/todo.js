let todoDatas = [];

export const findAll = () => todoDatas;

export const save = data => {
	const { userId, text } = data;

	// TODO: validation 적용하기
	if (!userId || !text) throw new Error("invalide data");

	// TODO: user data 조회 후 데이터 같이 넣어주기
	const todo = {
		id: Date.now(),
		userId,
		text,
		createdAt: new Date().toDateString(),
	};
	todoDatas.push(todo);

	return todo;
};

export const updateById = data => {
	const { id, text } = data;
	console.log(id);
	const findTodo = todoDatas.find(todo => todo.id === parseInt(id));
	findTodo.text = text;

	return findTodo.id;
};

export const deleteById = id => {
	todoDatas = todoDatas.filter(todo => todo.id != parseInt(id));
	return;
};
