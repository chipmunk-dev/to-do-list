// global
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

// local
import * as config from "./config.js";

const app = express();
const corsOptions = {
	origin: config.cors.allowOrigin,
	optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(config.port, () => {
	console.log("Connect Server...");
});
