import { Service } from "typedi";
import { Todo } from "../model/todo";
import TodoRepository, { CreateTodo } from "../repository/todoRepository";


@Service()
class TodoService {
    private readonly _todoRepository: TodoRepository;

    constructor(
        todoRepository: TodoRepository,
    ) {
        this._todoRepository = todoRepository;
    }



    public async createTodo(title: string): Promise<Todo> {

        const createTodo: CreateTodo = {
            title: title,
            complete: 0,
        }

        try {
            return await this._todoRepository.createTodo(createTodo);
        } catch (e) {
            throw Error(`Failed to create a todo: ${String(e)}`);
        }
    }
}

export { TodoService }
