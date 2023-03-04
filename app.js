// global
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

// local
import { config } from "./config.js";
import todoRouter from "./router/todo.js";
import userRouter from "./router/user.js";

const app = express();
const corsOptions = {
	origin: config.cors.allowOrigin,
	optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("tiny"));

// route
app.use("/todo", todoRouter);
app.use("/user", userRouter);

app.listen(config.port, () => {
	console.log("Connect Server...");
});
