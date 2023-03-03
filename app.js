// global
import express from "express";

// local
import * as config from "./config.js";

const app = express();

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(config.port, () => {
	console.log("Connect Server...");
});
