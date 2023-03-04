import bcrypt from "bcrypt";

import * as userRepository from "../data/user.js";
import { config } from "../config.js";
import { userToUserResponseDto } from "../mapped/user.js";

export const getUsers = async (request, response) => {
	const userList = await userRepository.findAll();

	return response.status(200).json({ userList });
};

export const login = async (request, response) => {
	const { username, password } = request.body;
	const user = await userRepository.findByUsername(username);

	if (!user)
		return response.status(403).json({ message: "invalid authentication" });

	// TODO: apply Bcrypt
	const decodeMatch = await bcrypt.compare(password, user.password);

	if (!decodeMatch)
		return response.status(403).json({ message: "invalid authentication" });

	// TODO: apply jwt

	const userResponseDto = userToUserResponseDto(user);

	return response.status(200).json({ user: userResponseDto });
};

export const register = async (request, response) => {
	const { username, password } = request.body;

	// TODO: apply Bcrypt
	const salt = await bcrypt.genSalt(config.bcrypt.saltRounds);
	const hash = await bcrypt.hash(password, salt);
	const result = await userRepository.create({ username, password: hash });
	const userResponseDto = userToUserResponseDto(result);

	// TODO: apply jwt

	return response.status(201).json({ user: userResponseDto });
};

// TODO: Auth middleware
export const me = async (request, response) => {};
