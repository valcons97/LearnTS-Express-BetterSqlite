import { FieldIsRequiredError } from "../error/validationError";

export const validateField: Validator<string> = (
	field?: string | undefined
): Error | null => {
	const fieldName = "title";

	if (field == null || field == undefined || field === "") {
		return new FieldIsRequiredError(fieldName);
	}

	return null;
};

export type Validator<T> = (data?: T | undefined) => Error | null;

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
