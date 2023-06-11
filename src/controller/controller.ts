import express, { Request, Response } from 'express';
import model from '../model/todo_model'

const getTodo = async (req: Request, res: Response) => {
    try {
        const results = await model.getTodo();
        return res.status(200).json({
            status: "OK",
            message: "Sucesfully get todo",
            results
        })
    } catch (e) {
        return res.status(500).json({ msg: "fail to get", })
    }



}


const createTodo = async (req: Request, res: Response) => {
    try {
        const results = await model.create(req.body.title,);
        res.status(201).json({
            message: "Sucesfully create todo",
        })
    } catch (e) {
        return res.status(500).json({ msg: "fail to create", })
    }

}


export = {
    getTodo,
    createTodo,
}
