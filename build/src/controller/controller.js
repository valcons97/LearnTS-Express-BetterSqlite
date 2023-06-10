"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const todo_model_1 = __importDefault(require("../model/todo_model"));
const getTodo = async (req, res) => {
    const results = await todo_model_1.default.getTodo();
    res.status(200).json({
        status: "OK",
        message: "Get Data Success",
        results
    });
};
const createTodo = async (req, res) => {
    const results = await todo_model_1.default.create(req.body.title);
    res.status(201).json({
        message: "done",
    });
};
module.exports = {
    getTodo,
    createTodo,
};
