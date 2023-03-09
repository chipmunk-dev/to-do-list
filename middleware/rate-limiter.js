import rateLimit from 'express-rate-limit';
import { config } from '../config';

export default rateLimit({
	windowMs: config.rateLimit.windowMs,
	max: config.rateLimit.max,
});
