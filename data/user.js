let userId = 0;
let userList = [];

export const findByUsername = username =>
	userList.find(user => user.username === username);

export const create = data => {
	const { username, password } = data;
	const findUser = findByUsername(username);

	if (findUser) return null;

	const user = {
		id: ++userId,
		username,
		password,
		createdAt: new Date().toDateString(),
	};
	userList.push(user);

	return user;
};
