import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import * as userRepository from "../data/user.js";
import { config } from "../config.js";
import { userToUserResponseDto } from "../mapped/user.js";

export const getUsers = async (_request, response) => {
	const userList = await userRepository.findAll();

	return response.status(200).json({ userList });
};

export const login = async (request, response) => {
	const { username, password } = request.body;
	const user = await userRepository.findByUsername(username);

	if (!user)
		return response.status(403).json({
			message: "아이디가 존재하지 않거나 비밀번호가 일치하지 않습니다.",
		});

	const decodeMatch = await bcrypt.compare(password, user.password);

	if (!decodeMatch)
		return response.status(403).json({
			message: "아이디가 존재하지 않거나 비밀번호가 일치하지 않습니다.",
		});

	const userResponseDto = userToUserResponseDto(user);
	const token = createToken(userResponseDto);

	return response.status(200).json({ token, user: userResponseDto });
};

export const register = async (request, response) => {
	const { username, password } = request.body;
	const user = await userRepository.findByUsername(username);

	if (user)
		return response
			.status(409)
			.json({ message: "이미 존재하는 아이디입니다." });

	const salt = await bcrypt.genSalt(config.bcrypt.saltRounds);
	const hash = await bcrypt.hash(password, salt);
	const result = await userRepository.create({ username, password: hash });
	const userResponseDto = userToUserResponseDto(result);
	const token = createToken(userResponseDto);

	return response.status(201).json({ token, user: userResponseDto });
};

// TODO: Auth middleware
export const me = async (request, response) => {};

const createToken = userInfo => {
	return jwt.sign(userInfo, config.jwt.secretKey, {
		expiresIn: config.jwt.expiresIn,
	});
};
