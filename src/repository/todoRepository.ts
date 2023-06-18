import { Database } from "better-sqlite3";
import { Todo } from "../model/todo";
import { Inject, Service } from "typedi";
import diConfig from "../config/di";

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
		const todoId: number | bigint = this.db.transaction(() => {
			if (!todo.description) todo.description = "";
			const insertTodoQuery =
				"INSERT INTO todo (title,description,complete) values(?,?,?)";
			const insertResult = this.db
				.prepare(insertTodoQuery)
				.run(todo.title, todo.description, 0);

			return insertResult.lastInsertRowid;
		})();

		return new Todo(todoId, todo.title, todo.description, 0);
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

		query = `${query} LIMIT ${limit} OFFSET ${page * 10 - 10}`;
		console.log(query);

		try {
			return this.db.transaction(() => {
				const rows = this.db.prepare(query).all(args);
				if (rows.length == 0) {
					return [];
				}

				const castRows = rows as [{ [key: string]: any }];

				return castRows.map(
					(row) =>
						new Todo(
							row.id,
							row.title,
							row.description,
							row.complete
						)
				);
			})();
		} catch (e) {
			throw Error(`Failed to get list of todo, e: : ${e}`);
		}
	}

	public async updateTodo(id: number): Promise<Todo> {
		const todo = this.db.transaction(() => {
			/// Use ? to prevent sql injection in update
			/// https://stackoverflow.com/a/73553451
			const updateTodoQuery = `UPDATE todo SET complete = NOT complete WHERE id = ?`;
			const selectUpdatedQuery = `SELECT id,title,complete FROM todo WHERE id = ?`;
			this.db.prepare(updateTodoQuery).run(id);
			const getResult = this.db.prepare(selectUpdatedQuery).get(id);

			return getResult as Todo;
		})();

		return new Todo(todo.id, todo.title, todo.description, todo.complete);
	}
}

export type CreateTodo = {
	title: string;
	description?: string;
	complete: number;
};
