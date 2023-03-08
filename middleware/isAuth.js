import jwt from 'jsonwebtoken';

import * as userRepository from '../data/user.js';
import { config } from '../config.js';

const isAuth = async (req, res, next) => {
	let token;
	const authHeaderToken = req.get('Authorization');

	if (authHeaderToken && authHeaderToken.startsWith('Bearer ')) {
		token = authHeaderToken.split(' ')[1];
	}

	if (!token) {
		token = req.cookies['token'];
	}

	if (!token) {
		return res.status(401).json({ message: '사용자 인증 에러' });
	}

	try {
		const decoded = await jwt.verify(token, config.jwt.secretKey);
		const user = await userRepository.findByUserId(decoded.id);

		if (!user) return res.status(401).json({ message: '사용자 인증 에러' });

		req.userId = decoded.id;
		req.token = token;
		next();
	} catch (err) {
		console.error(err);
		return res.status(401).json({ message: '사용자 인증 에러' });
	}
};

export default isAuth;
