import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { TodoService } from "../service/todoService";

export const updateTodo = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params?.id;

	const service = Container.get(TodoService);
	try {
		const results = await service.updateTodo(parseInt(id));
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
