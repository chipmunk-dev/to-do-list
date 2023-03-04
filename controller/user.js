import * as userRepository from "../data/user.js";

export const login = (request, response) => {
	const { username, password } = request.body;
	const user = userRepository.findByUsername(username);

	if (!user)
		return response.status(403).json({ message: "invalid authentication" });
	// TODO: apply Bcrypt
	if (user.password !== password)
		return response.status(403).json({ message: "invalid authentication" });

	// TODO: apply jwt
	const sendUserInfo = { ...user };
	delete sendUserInfo.password;

	return response.status(200).json({ user: sendUserInfo });
};

export const register = (request, response) => {
	const { username, password } = request.body;
	const user = userRepository.create({ username, password });

	// TODO: apply jwt
	const sendUserInfo = { ...user };
	delete sendUserInfo.password;
	return response.status(201).json({ user: sendUserInfo });
};

// TODO: Auth middleware
export const me = (request, response) => {};
