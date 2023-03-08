import bcrypt from 'bcrypt';
import { config } from '../config.js';

export const csrfCheck = (req, res, next) => {
	if (req.method === 'GET' || req.method === 'OPTIONS' || req.method === 'HEAD') {
		return next();
	}

	const csrfHeader = req.get('_csrf-token');

	if (!csrfHeader) {
		console.warn('Missing required "_csrf-token" header.', req.headers.origin);
		return res.status(403).json({ message: 'Failed CSRF Check' });
	}

	validateCsrfToken(csrfHeader)
		.then((valid) => {
			if (!valid) {
				console.warn(
					'Value provided in "_csrf-token" header does not validate.',
					req.headers.origin,
					csrfHeader
				);
				return res.status(403).json({ message: 'Failed CSRF Check' });
			}
			next();
		})
		.catch((err) => {
			console.error(err);
			return res.status(500).json({ message: 'Something went wrong...' });
		});
};

const validateCsrfToken = async (csrfHeader) => {
	return bcrypt.compare(config.csrf.plainToken, csrfHeader);
};
