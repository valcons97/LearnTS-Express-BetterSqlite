import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../error/validationError";
import { CustomError } from "../error/customError";
import { BadRequestError } from "../error/badRequestError";

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let statusCode: number;
	if (err instanceof ValidationError) {
		statusCode = 400;
	} else if (err instanceof BadRequestError) {
		statusCode = 400;
	} else if (err instanceof CustomError) {
		statusCode = err.HttpStatusCode;
	} else {
		statusCode = 500;
	}

	return res.status(statusCode).json({
		message: err.message,
	});
};
