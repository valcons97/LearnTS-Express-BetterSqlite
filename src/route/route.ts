import express, { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import controller from '../controller/controller';
import todoValidator from '../validator/validator'

const router = express.Router();

router.get('/get', controller.getTodo);

router.post('/create', todoValidator.checkCreateTodo(),
    (req: Request, res: Response, next: NextFunction) => {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(500).json(error);
        } next();
    }, controller.createTodo);

export = {
    route: router
}
