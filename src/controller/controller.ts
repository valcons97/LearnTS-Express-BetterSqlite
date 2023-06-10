import express, { Request, Response } from 'express';
import model from '../model/todo_model'

const createTodo = async (req: Request, res: Response) => {
    const results = await model.create(req.body.title,);
    res.status(201).json({
        message: "done",
    })
}

export = {
    createTodo,
}
