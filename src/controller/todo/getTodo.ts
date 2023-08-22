import { Request, Response, NextFunction } from "express";
import Container from "typedi";
import { CustomError } from "../../error/customError";
import { TodoService } from "../../service/todoService";

export const getTodo = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const service = Container.get(TodoService);

	let id;

	const ids = req.query?.ids as string | undefined;

	const page = req.query?.page as number | undefined;

	const limit = req.query?.limit as number | undefined;

	if (req.params?.id && req.query?.ids)
		return next(
			new CustomError(
				500,
				"Please remove / disable ids in query parameter"
			)
		);

	if (req.params?.id === undefined) id = undefined;
	else id = [parseInt(req.params?.id)];

	if (!req.params?.id) if (ids) id = ids.split(/[^0-9]/).map(Number);

	try {
		const todos = await service.getTodo(id, limit, page);

		return res.status(200).json({
			message: "Default limit and maximum limit is 10",
			data: todos,
		});
	} catch (e) {
		return next(e);
	}
};
