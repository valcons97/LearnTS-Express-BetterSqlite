import dotenv from "dotenv";

dotenv.config();

const dbPath =
	process.env.NODE_ENV !== "e2e"
		? process.env.DB_PATH
		: process.env.DB_PATH_E2E;
if (!dbPath) {
	throw Error("DB_PATH env is not provided");
}

export default {
	port: process.env.PORT || 9000,
	dbPath: dbPath,
	isE2e: process.env.NODE_ENV === "e2e",
};
