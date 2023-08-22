import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { TodoService, IdNotFoundError } from "../../service/todoService";
import { CustomError } from "../../error/customError";
import Todo from "../../model/todo";

export const updateTodoCompleted = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params?.id;

	const service = Container.get(TodoService);

	try {
		const results = await service.updateTodoCompleted(parseInt(id));
		res.status(200).json({
			message: `Sucesfully update todo with id = ${id}`,
			todo: results,
		});
	} catch (e) {
		let err: any;

		err = e;

		return next(err);
	}
};
