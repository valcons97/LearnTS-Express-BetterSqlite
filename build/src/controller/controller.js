"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const todo_model_1 = __importDefault(require("../model/todo_model"));
const createTodo = async (req, res) => {
    const results = await todo_model_1.default.create(req.body.title);
    res.status(201).json({
        message: "done",
    });
};
module.exports = {
    createTodo,
};
