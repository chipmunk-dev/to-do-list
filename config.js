import * as dotenv from 'dotenv';

dotenv.config();

const required = (key, defaultValue = null) => {
	const value = process.env[key] || defaultValue;

	if (value == null) throw new Error(`Key ${key} is undefined`);

	return value;
};

export const config = {
	port: parseInt(required('SERVER_PORT', 3000)),
	cors: {
		allowOrigin: required('CORS_ORIGIN'),
	},
	bcrypt: {
		saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS')),
	},
	jwt: {
		secretKey: required('JWT_SECRET_KEY'),
		expiresIn: parseInt(required('JWT_EXPIRES_IN')),
	},
	db: {
		host: required('DB_HOST'),
	},
	csrf: {
		plainToken: required('CSRF_SECRET_KEY'),
	},
	rateLimit: {
		windowMs: parseInt(required('RATE_LIMIT_MS')),
		max: parseInt(required('RATE_LIMIT_MAX')),
	},
	swagger: {
		apiVersion: required('SWAGGER_API_VERION'),
		auth: {
			type: required('SWAGGER_AUTH_TYPE'),
			scheme: required('SWAGGER_AUTH_SCHEME'),
			format: required('SWAGGER_AUTH_FORMAT'),
		},
	},
};
