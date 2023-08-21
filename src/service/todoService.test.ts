import sinon, { SinonStubbedInstance } from "sinon";
import TodoRepository from "../repository/todoRepository";
import { TodoService } from "./todoService";
import "mocha";
import chai from "chai";
import sinonChai from "sinon-chai";
import Todo from "../model/todo";

var expect = chai.expect;
chai.use(sinonChai);

describe("TodoService", () => {
	let todoService: TodoService;
	let todoRepository: SinonStubbedInstance<TodoRepository>;

	const fakeTodo = new Todo(0, "Fake Title", "Fake Description", 0);

	const updatedTodo = new Todo(0, "Fake Title", "Fake Description", 1);

	const createTodo = new Todo(1, "Fake Title New", "Fake Description New", 0);

	beforeEach(() => {
		todoRepository = sinon.createStubInstance(TodoRepository);
		todoService = new TodoService(todoRepository);
	});

	describe("/GET", () => {
		it("should return all list of todo", async () => {
			todoRepository.getTodo.returns(
				new Promise((resolve, reject) => {
					resolve([fakeTodo, createTodo]);
				})
			);

			const todo = await todoService.getTodo();

			expect(todoRepository.getTodo).calledOnce;
			expect(todo.length).equal(2);
		});
	});

	describe("/CREATE", () => {
		it("should add new todo", async () => {
			todoRepository.createTodo.returns(
				new Promise((resolve, reject) => {
					resolve(createTodo);
				})
			);

			const todo = await todoService.createTodo(
				createTodo.title,
				createTodo.description
			);

			expect(todoRepository.createTodo).calledOnce;

			expect(todo.title).equal(createTodo.title);
			expect(todo.description).equal(createTodo.description);
			expect(todo.complete).equal(0);
		});
	});

	describe("/UPDATE", () => {
		it("should update Todo from given id", async () => {
			todoRepository.updateTodo.returns(
				new Promise((resolve, reject) => {
					resolve(updatedTodo);
				})
			);

			const todo = await todoService.updateTodoCompleted(fakeTodo.id);

			expect(todoRepository.updateTodo).calledOnce;
			expect(todo.complete).equal(1);
		});
	});

	describe("/DELETE", () => {
		it("should delete Todo", async () => {
			todoRepository.deleteTodo.returns(
				new Promise((resolve, reject) => {
					resolve(true);
				})
			);

			const todo = await todoService.deleteTodo(fakeTodo.id);

			expect(todoRepository.deleteTodo).calledOnce;
			expect(todo).true;
		});
	});
});
