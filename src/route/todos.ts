import { Router } from "express";
import { createTodo } from "../controller/todo/createTodo";
import { deleteTodo } from "../controller/todo/deleteTodo";
import { getTodo } from "../controller/todo/getTodo";
import { updateTodoCompleted } from "../controller/todo/updateTodo";

const router = Router();

router.get("/get", getTodo);

router.get("/get/:id", getTodo);

router.post("/create", createTodo);

router.patch("/update/:id", updateTodoCompleted);

router.delete("/delete/:id", deleteTodo);

export default router;
