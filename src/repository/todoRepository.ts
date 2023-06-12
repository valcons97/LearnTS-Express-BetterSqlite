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
            const insertOrderQuery = "INSERT INTO todo (title,complete) values(?,?)";
            const insertResult = this.db.prepare(insertOrderQuery).run(todo.title, 0);

            return insertResult.lastInsertRowid;
        })();

        return new Todo(todoId, todo.title, 0);
    }
}

export type CreateTodo = {
    title: string;
    complete: number;
}

