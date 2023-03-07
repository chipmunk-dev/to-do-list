import mongoose from 'mongoose';
import { mapVirtualId } from '../mapped/db.js';

const schema = new mongoose.Schema(
	{
		content: { type: String, required: true },
		complete: { type: Boolean, required: true },
		userId: { type: String, require: true },
	},
	{ timestamps: true }
);
mapVirtualId(schema);
const Todo = mongoose.model('todo', schema);

export const findAll = async () => {
	return Todo.find();
};

export const save = async (data) => {
	const { userId, content } = data;

	return new Todo({ content, complete: false, userId }).save();
};

export const updateById = (data) => {
	const { id, content } = data;
	return Todo.findOneAndUpdate({ _id: id }, { content }, { new: true });
};

export const deleteById = (id) => {
	return Todo.deleteOne({ _id: id });
};
