import * as dotenv from "dotenv";

dotenv.config();

const required = (key, defaultValue = null) => {
	const value = process.env[key] || defaultValue;

	if (value == null) throw new Error(`Key ${key} is undefined`);

	return value;
};

export const config = {
	port: parseInt(required("SERVER_PORT", 8080)),
};
