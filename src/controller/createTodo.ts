import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { TodoService } from "../service/todoService";
import {
	validateFn,
	validateFieldWithoutEmptyString,
	validateFieldWithEmptyString,
} from "../validator/validator";

export const createTodo = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { title, description } = req.body;

	const validationError: Error | null = validateFn(
		() => validateFieldWithoutEmptyString(title, "title"),
		() => validateFieldWithEmptyString(description, "description")
	);
	if (validationError != null) {
		return next(validationError);
	}
	const service = Container.get(TodoService);
	try {
		const results = await service.createTodo(title, description);
		res.status(200).json({
			message: "Sucesfully create todo",
			todo: results,
		});
	} catch (e) {
		let err: any;

		err = e;

		return next(err);
	}
};
