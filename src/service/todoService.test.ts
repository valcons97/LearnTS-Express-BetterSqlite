import sinon, { SinonStubbedInstance } from "sinon";
import TodoRepository from "../repository/todoRepository";
import { TodoService } from "./todoService";
import "mocha";
import chai from "chai";
import sinonChai from "sinon-chai";
import Todo from "../model/todo";
import { BadRequestError } from "../error/badRequestError";
import { NotFoundError } from "../error/notFoundError";

var expect = chai.expect;
chai.use(sinonChai);

describe("TodoService", () => {
	let todoService: TodoService;
	let todoRepository: SinonStubbedInstance<TodoRepository>;

	const fakeTodo1 = new Todo(0, "Fake Title", "Fake Description", 0);

	const fakeTodo2 = new Todo(1, "Fake Title", "Fake Description", 1);

	const fakeTodo3 = new Todo(2, "Fake Title New", "Fake Description New", 0);

	beforeEach(() => {
		todoRepository = sinon.createStubInstance(TodoRepository);
		todoService = new TodoService(todoRepository);
	});

	describe("/GET", () => {
		it("should return all list of todo", async () => {
			todoRepository.getTodo.returns(
				new Promise((resolve, reject) => {
					resolve([fakeTodo1]);
				})
			);

			const todo = await todoService.getTodo();

			expect(todoRepository.getTodo).calledOnce;
			expect(todo.length).equal(1);
		});
	});

	describe("/CREATE", () => {
		it("should add new todo", async () => {
			todoRepository.createTodo.returns(
				new Promise((resolve, reject) => {
					resolve(fakeTodo3);
				})
			);

			const todo = await todoService.createTodo(
				fakeTodo3.title,
				fakeTodo3.description
			);

			expect(todoRepository.createTodo).calledOnce;

			expect(todo.title).equal(fakeTodo3.title);
			expect(todo.description).equal(fakeTodo3.description);
			expect(todo.complete).equal(0);
		});
	});

	describe("/UPDATE", () => {
		it("should update Todo from given id", async () => {
			const fakeUpdateTodo = new Todo(
				1,
				"Fake Title",
				"Fake Description",
				1
			);
			todoRepository.getTodo.returns(
				new Promise((resolve, reject) => {
					resolve([fakeTodo3]);
				})
			);
			todoRepository.updateTodo.returns(
				new Promise((resolve, reject) => {
					resolve(fakeUpdateTodo);
				})
			);

			const todo = await todoService.updateTodoCompleted(fakeTodo3.id);

			expect(todoRepository.updateTodo).calledOnce;
			expect(todo.complete).equal(1);
		});

		it("should return NotFoundError when Todo id is not found", async () => {
			todoRepository.getTodo.returns(
				new Promise((resolve, reject) => {
					// returns an empty array
					resolve([]);
				})
			);
			let error: unknown | null = null;
			try {
				await todoService.updateTodoCompleted(1);
			} catch (e) {
				error = e;
			}

			expect(error).not.null;
			expect(error).instanceOf(NotFoundError);
		});
	});

	describe("/DELETE", () => {
		it("should delete Todo", async () => {
			todoRepository.deleteTodo.returns(
				new Promise((resolve, reject) => {
					resolve(true);
				})
			);

			const todo = await todoService.deleteTodo(fakeTodo1.id);

			expect(todoRepository.deleteTodo).calledOnce;
			expect(todo).true;
		});
	});
});
