import { Service } from "typedi";
import { Todo } from "../model/todo";
import TodoRepository, {
	CreateTodo,
	UpdateTodo,
} from "../repository/todoRepository";

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

	public async updateTodo(id: number): Promise<Todo> {
		const updateTodo: UpdateTodo = {
			id: id,
		};
		return await this._todoRepository.updateTodo(updateTodo);
	}
}

export { TodoService };
