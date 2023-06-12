import 'reflect-metadata';
import express, { Express, Request, Response } from 'express';
import router from './route/route'
import { createDB } from './database';
import { Database } from "better-sqlite3"
import { Container } from 'typedi';
import diConfig from './config/di';

export const createApp = async (): Promise<Express> => {
    const app: Express = express();

    app.get("/", (req: Request, res: Response) => {
        return res.send('Simple to do list created using Typescript, Express ,and Better-sqlite3')
    })

    app.use(express.json());
    app.use(router);
    const db: Database = createDB();
    Container.set<Database>(diConfig.database, db);

    return app;
}










