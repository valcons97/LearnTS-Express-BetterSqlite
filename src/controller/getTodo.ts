import { Request, Response, NextFunction } from "express";
import Container from "typedi";
import { TodoService } from "../service/todoService";

export const getTodo = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const service = Container.get(TodoService);

	var id;

	if (req.params?.id === undefined) id = undefined;
	else id = [parseInt(req.params?.id)];

	const offset = req.query?.limit as number | undefined;

	const limit = req.query?.limit as number | undefined;

	try {
		const todos = await service.getTodo(id, limit);

		return res.status(200).json({
			message: "Default limit is 10",
			data: todos,
		});
	} catch (e) {
		return next(e);
	}
};
