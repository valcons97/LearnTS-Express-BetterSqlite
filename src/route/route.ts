import express from 'express';
import controller from '../controller/controller';

const router = express.Router();

router.get('/getTodo', controller.getTodo);

router.get('/createTodo', controller.createTodo);

export = {
    route: router
}
