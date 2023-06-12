import express, { NextFunction, Request, Response } from "express";
import Container from "typedi";
import {
	FieldIsRequiredError,
	ValidationError,
} from "../error/validationError";
import { TodoService } from "../service/todoService";

export const createTodo = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const service = Container.get(TodoService);
	try {
		const results = await service.createTodo(req.body.title);
		res.status(200).json({
			message: "Sucesfully create todo",
			todo: results,
		});
	} catch (e) {
		let err: any;
		if (req.body.title == null) {
			err = new FieldIsRequiredError("Title");
		} else {
			err = e;
		}
		return next(err);
	}
};
