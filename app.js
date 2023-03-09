// global
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

// local
import todoRouter from './router/todo.js';
import userRouter from './router/user.js';
import rateLimit from './middleware/rate-limiter.js';
import swaggerDocs from './util/swagger.js';
import { csrfCheck } from './middleware/csrf.js';
import { connectDB } from './db/db.js';
import { config } from './config.js';

const app = express();
const corsOptions = {
	origin: config.cors.allowOrigin,
	optionsSuccessStatus: 200,
	credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('tiny'));
app.use(rateLimit);

// middleware
app.use(csrfCheck);

// route
app.use('/todo', todoRouter);
app.use('/user', userRouter);
swaggerDocs(app);

app.use((_req, res, _next) => res.sendStatus(400));

app.use((error, _req, res, _next) => {
	console.error(error);
	return res.sendStatus(500);
});

connectDB().then(() => {
	console.log('Connect DB...');
	app.listen(config.port, () => {
		console.log('Connect Server...');
	});
});
