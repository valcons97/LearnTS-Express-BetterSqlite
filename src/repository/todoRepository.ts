import { Database } from "better-sqlite3";
import { Todo } from "../model/todo";
import { Inject, Service } from "typedi";
import diConfig from "../config/di";

/// Note:
/// Used prepared statement
///
@Service()
export default class TodoRepository {
	private db: Database;

	constructor(
		@Inject(diConfig.database)
		db: Database
	) {
		this.db = db;
	}

	public async createTodo(todo: CreateTodo): Promise<Todo> {
		try {
			const insertTodoQuery =
				"INSERT INTO todo (title,description,complete) values(?,?,?)";
			const insertedId = this.db
				.prepare(insertTodoQuery)
				.run(todo.title, todo.description, 0).lastInsertRowid;

			return new Todo(insertedId, todo.title, todo.description, 0);
		} catch (e) {
			throw Error(`Failed to create todo, e: : ${e}`);
		}
	}

	public async getTodo(
		ids?: number[],
		limit?: number,
		page?: number
	): Promise<Todo[]> {
		let query = "SELECT id, title, complete FROM todo";
		let args: number[] = [];

		if (ids) {
			const multipleId = ids.map(() => "?").join(",");
			query = `${query} WHERE id IN (${multipleId})`;
			args = ids;
		}

		if (limit === undefined || limit > 10) limit = 10;

		if (page === undefined) page = 1;

		query = `${query} LIMIT ${limit} OFFSET ${page * limit - limit}`;
		console.log(query);

		try {
			const rows = this.db.prepare(query).all(args);
			if (rows.length == 0) {
				return [];
			}

			const castRows = rows as [{ [key: string]: any }];

			return castRows.map(
				(row) =>
					new Todo(row.id, row.title, row.description, row.complete)
			);
		} catch (e) {
			throw Error(`Failed to get list of todo, e: : ${e}`);
		}
	}

	public async updateTodo(todo: TodoId): Promise<Todo> {
		try {
			const updateTodoQuery = `UPDATE todo SET complete = NOT complete WHERE id = ?`;
			const selectUpdatedQuery = `SELECT id,title,complete FROM todo WHERE id = ?`;
			this.db.prepare(updateTodoQuery).run(todo.id);
			const resultTodo = this.db
				.prepare(selectUpdatedQuery)
				.get(todo.id) as Todo;

			return new Todo(
				resultTodo.id,
				resultTodo.title,
				resultTodo.description,
				resultTodo.complete
			);
		} catch (e) {
			throw Error(`Failed to update todo, e: : ${e}`);
		}
	}

	public async deleteTodo(todo: TodoId): Promise<boolean> {
		try {
			const updateTodoQuery = `DELETE FROM todo WHERE id = ?`;
			this.db.prepare(updateTodoQuery).run(todo.id);

			return true;
		} catch (e) {
			throw Error(`Failed to update todo, e: : ${e}`);
		}
	}
}

export type CreateTodo = {
	title: string;
	description?: string;
	complete: number;
};

export type TodoId = {
	id: number;
};

//* How to use transaction
//* If you successfully remove money from account A,
//* but fail to add money to account B, then the transaction fails
//* and the transaction must be rolled back so that the money is not taken from account A.
// public async createTodo(todo: CreateTodo): Promise<Todo> {
// 	const insertTodoQuery =
// 		"INSERT INTO todo (title,description,complete) values(?,?,?)";
// 	const id = this.db
// 		.prepare(insertTodoQuery)
// 		.run(todo.title, todo.description, 0).lastInsertRowid;

// 	return new Todo(id, todo.title, todo.description, 0);
// }

// public async getTodo(
// 	ids?: number[],
// 	limit?: number,
// 	page?: number
// ): Promise<Todo[]> {
// 	let query = "SELECT id, title, complete FROM todo";
// 	let args: number[] = [];

// 	if (ids) {
// 		const multipleId = ids.map(() => "?").join(",");
// 		query = `${query} WHERE id IN (${multipleId})`;
// 		args = ids;
// 	}

// 	if (limit === undefined || limit > 10) limit = 10;

// 	if (page === undefined) page = 1;

// 	query = `${query} LIMIT ${limit} OFFSET ${page * 10 - 10}`;
// 	console.log(query);

// 	try {
// 		return this.db.transaction(() => {
// 			const rows = this.db.prepare(query).all(args);
// 			if (rows.length == 0) {
// 				return [];
// 			}

// 			const castRows = rows as [{ [key: string]: any }];

// 			return castRows.map(
// 				(row) =>
// 					new Todo(
// 						row.id,
// 						row.title,
// 						row.description,
// 						row.complete
// 					)
// 			);
// 		})();
// 	} catch (e) {
// 		throw Error(`Failed to get list of todo, e: : ${e}`);
// 	}
// }

// public async updateTodo(id: number): Promise<Todo> {
// 	const todo = this.db.transaction(() => {
// 		/// Use ? to prevent sql injection in update
// 		/// https://stackoverflow.com/a/73553451
// 		const updateTodoQuery = `UPDATE todo SET complete = NOT complete WHERE id = ?`;
// 		const selectUpdatedQuery = `SELECT id,title,complete FROM todo WHERE id = ?`;
// 		this.db.prepare(updateTodoQuery).run(id);
// 		const getResult = this.db.prepare(selectUpdatedQuery).get(id);

// 		return getResult as Todo;
// 	})();

// 	return new Todo(todo.id, todo.title, todo.description, todo.complete);
// }
