"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_model_1 = __importDefault(require("../model/todo_model"));
class Controller {
    getTodo = async (req, res) => {
        try {
            const results = await todo_model_1.default.getTodo();
            return res.status(200).json({
                status: "OK",
                message: "Sucesfully get todo",
                results
            });
        }
        catch (e) {
            return res.status(500).json({ msg: "fail to get", });
        }
    };
    createTodo = async (req, res) => {
        try {
            const results = await todo_model_1.default.create(req.body.title);
            res.status(201).json({
                message: "Sucesfully create todo",
            });
        }
        catch (e) {
            return res.status(500).json({ msg: "fail to create", });
        }
    };
}
exports.default = new Controller();
