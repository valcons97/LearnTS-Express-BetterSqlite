"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
class TodoValidator {
    checkCreateTodo() {
        return [
            (0, express_validator_1.body)('title').notEmpty().withMessage("The title field should not be empty"),
        ];
    }
}
exports.default = new TodoValidator();
