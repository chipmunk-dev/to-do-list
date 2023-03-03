const todoDatas = [];

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
