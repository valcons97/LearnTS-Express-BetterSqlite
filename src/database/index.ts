import DatabaseConstructor, { Database } from "better-sqlite3";
import config from "../config";

export const createDB = (): Database => {
	const db = new DatabaseConstructor(config.dbPath);
	db.exec("PRAGMA foreign_keys = ON");

	const createTodoTable =
		"CREATE TABLE IF NOT EXISTS todo \
	                ('id' INTEGER PRIMARY KEY AUTOINCREMENT, \
	                'title' varchar NOT NULL,\
					'description' varchar NOT NULL,\
	                'complete' BOOLEAN);";

	const createUserTable =
		"CREATE TABLE IF NOT EXISTS users \
	                ('id' INTEGER PRIMARY KEY AUTOINCREMENT, \
	                'email' TEXT NOT NULL UNIQUE,\
					'password' TEXT NOT NULL,\
	                'created_at' DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);";

	db.exec(createTodoTable);
	db.exec(createUserTable);

	// db.exec("DROP TABLE todo");
	// console.log("Todo table dropped");

	return db;
};
