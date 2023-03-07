import mongoose from "mongoose";
import { config } from "../config.js";

export const connectDB = async () => {
	return mongoose.connect(config.db.host);
};
