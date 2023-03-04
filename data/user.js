let userId = 0;
let userList = [];

export const findAll = () => userList;

export const findByUsername = async username =>
	userList.find(user => user.username === username);

export const create = async data => {
	const { username, password } = data;
	const user = {
		id: ++userId,
		username,
		password,
		createdAt: new Date().toDateString(),
	};
	userList.push(user);

	return user;
};
