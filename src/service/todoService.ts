import { Service } from "typedi";
import Todo from "../model/todo";
import { NotFoundError } from "../error/notFoundError";
import { CustomError } from "../error/customError";
import TodoRepository, {
	CreateTodo,
	TodoId,
} from "../repository/todoRepository";

class IdNotFoundError extends NotFoundError {
	constructor(ids: number[]) {
		super(`Todo with id of [${ids.join(", ")}]`);
	}
}

@Service()
class TodoService {
	private readonly _todoRepository: TodoRepository;

	constructor(todoRepository: TodoRepository) {
		this._todoRepository = todoRepository;
	}

	public async createTodo(
		title: string,
		description?: string | undefined
	): Promise<Todo> {
		const createTodo: CreateTodo = {
			title: title,
			description: description,
			complete: 0,
		};

		try {
			return await this._todoRepository.createTodo(createTodo);
		} catch (e) {
			throw Error(`Failed to create a todo: ${String(e)}`);
		}
	}

	public async getTodo(
		id?: number[],
		limit?: number,
		page?: number
	): Promise<Todo[]> {
		return await this._todoRepository.getTodo(id, limit, page);
	}

	public async updateTodoCompleted(id: number | bigint): Promise<Todo> {
		const updateTodo: TodoId = {
			id: id,
		};

		if (id == undefined) {
			throw new CustomError(400, "Id is not defined");
		}

		const foundTodo: Todo[] = await this._todoRepository.getTodo([
			Number(id),
		]);

		if (foundTodo.length == 0) {
			throw new IdNotFoundError([Number(id)]);
		}
		try {
			return await this._todoRepository.updateTodo(updateTodo);
		} catch (e) {
			throw Error("Failed to update Todo : ${String(e)}");
		}
	}

	public async deleteTodo(id: number | bigint): Promise<boolean> {
		const deleteTodo: TodoId = {
			id: id,
		};
		return await this._todoRepository.deleteTodo(deleteTodo);
	}
}

export { TodoService, IdNotFoundError };
