import { BadRequestError } from "../error/badRequestError";
import { CustomError } from "../error/customError";
import { FieldIsRequiredError } from "../error/validationError";

export const validateFieldWithoutEmptyString: Validator<string> = (
	field?: string | undefined,
	fieldName?: string
): Error | null => {
	if (fieldName == null || fieldName == undefined || fieldName == "") {
		return new BadRequestError(
			"Cannot validate because fieldname is unknown. Please check validate function"
		);
	}
	if (field == null || field == undefined || field === "") {
		return new FieldIsRequiredError(fieldName!);
	}

	return null;
};

export const validateFieldWithEmptyString: Validator<string> = (
	field?: string | undefined,
	fieldName?: string
): Error | null => {
	if (fieldName == null || fieldName == undefined || fieldName == "") {
		return new BadRequestError(
			"Cannot validate because fieldname is unknown. Please check validate function"
		);
	}
	if (field == null || field == undefined) {
		return new FieldIsRequiredError(fieldName!);
	}

	return null;
};

export type Validator<T> = (
	field?: string,
	data?: T | undefined
) => Error | null;

export type OnError = (err: Error) => void;

export const validateFn = (...validators: Validator<any>[]): Error | null => {
	for (let i = 0; i < validators.length; i++) {
		const validator = validators[i];
		const err = validator();
		if (err != null) {
			return err;
		}
	}

	return null;
};
