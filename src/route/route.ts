import express, { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { createTodo } from "../controller/createTodo";

const router = express.Router();

// router.get('/get', controller.getTodo);

router.post("/create", createTodo);

export default router;
