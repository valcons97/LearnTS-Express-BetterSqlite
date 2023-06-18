import express, { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { createTodo } from "../controller/createTodo";
import { getTodo } from "../controller/getTodo";
import { updateTodo } from "../controller/updateTodo";

const router = express.Router();

router.get("/get", getTodo);

router.get("/get/:id", getTodo);

router.post("/create", createTodo);

router.patch("/update/:id", updateTodo);

export default router;
