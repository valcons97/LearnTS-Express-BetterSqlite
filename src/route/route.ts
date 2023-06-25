import express, { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { createTodo } from "../controller/createTodo";
import { deleteTodo } from "../controller/deleteTodo";
import { getTodo } from "../controller/getTodo";
import { updateTodoCompleted } from "../controller/updateTodo";

const router = express.Router();

router.get("/get", getTodo);

router.get("/get/:id", getTodo);

router.post("/create", createTodo);

router.patch("/update/:id", updateTodoCompleted);

router.delete("/delete/:id", deleteTodo);

export default router;
