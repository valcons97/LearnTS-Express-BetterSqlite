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
			const insertOrderQuery =
				"INSERT INTO todo (title,complete) values(?,?)";
			const insertResult = this.db
				.prepare(insertOrderQuery)
				.run(todo.title, 0);

			return insertResult.lastInsertRowid;
		})();

		return new Todo(todoId, todo.title, 0);
	}

	public async getTodo(ids?: number[], limit?: number): Promise<Todo[]> {
		let query = "SELECT id, title, complete FROM todo";
		let args: number[] = [];

		if (ids) {
			const multipleId = ids.map(() => "?").join(",");
			query = `${query} WHERE id IN (${multipleId})`;
			args = ids;
		}

		if (limit == undefined || limit > 10) limit = 10;

		query = `${query} LIMIT ${limit}`;
		console.log(query);

		try {
			const rows = this.db.prepare(query).all(args);
			if (rows.length == 0) {
				return [];
			}

			const castRows = rows as [{ [key: string]: any }];
			return castRows.map(
				(row) => new Todo(row.id, row.title, row.complete)
			);
		} catch (e) {
			throw Error(`Failed to get list of todo, e: : ${e}`);
		}
	}
}

export type CreateTodo = {
	title: string;
	complete: number;
};
