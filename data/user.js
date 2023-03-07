import mongoose from 'mongoose';
import { mapVirtualId } from '../mapped/db.js';

const schema = new mongoose.Schema({
	username: { type: 'string', required: true },
	password: { type: 'string', required: true },
});
mapVirtualId(schema);
const User = mongoose.model('user', schema);

export const findAll = async () => {
	return User.find();
};

export const findByUserId = async (userId) => {
	return User.findById(userId);
};

export const findByUsername = async (username) => {
	return User.findOne({ username });
};

export const create = async (data) => {
	const { username, password } = data;
	return new User({ username, password }).save();
};
