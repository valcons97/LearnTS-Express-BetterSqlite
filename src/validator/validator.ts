import { body } from 'express-validator';

class TodoValidator {
    checkCreateTodo() {
        return [
            body('title').notEmpty().withMessage("The title field should not be empty"),
        ];
    }
}

export default new TodoValidator();
