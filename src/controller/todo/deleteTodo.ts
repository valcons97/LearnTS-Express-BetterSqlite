import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { TodoService } from "../../service/todoService";

export const deleteTodo = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const id = req.params?.id;

	const service = Container.get(TodoService);
	try {
		const results = await service.deleteTodo(parseInt(id));
		res.status(200).json({
			message: `Sucesfully delete todo with id = ${id}`,
			deleted: results,
		});
	} catch (e) {
		let err: any;

		err = e;

		return next(err);
	}
};
