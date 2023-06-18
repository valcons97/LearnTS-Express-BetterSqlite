import DatabaseConstructor, { Database } from "better-sqlite3";
import config from "../config/config";

export const createDB = (): Database => {
	return createSqliteConn(config.isE2e);
};

const createSqliteConn = (reset: boolean = false): Database => {
	const db = new DatabaseConstructor(config.dbPath);
	db.exec("PRAGMA foreign_keys = ON");

	const createTable =
		"CREATE TABLE IF NOT EXISTS todo \
	                ('id' INTEGER PRIMARY KEY AUTOINCREMENT, \
	                'title' varchar NOT NULL,\
					'description' varchar,\
	                'complete' BOOLEAN);";

	db.exec(createTable);

	// db.exec("DROP TABLE todo");
	// console.log("Todo table dropped");

	return db;
};
