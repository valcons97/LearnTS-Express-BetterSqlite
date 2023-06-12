import express, { Express, Request, Response } from 'express';
import router from './route/route'

export const createApp = async (): Promise<Express> => {
    const app: Express = express();

    app.get("/", (req: Request, res: Response) => {
        return res.send('Simple to do list created using Typescript, Express ,and Better-sqlite3')
    })

    app.use(router.route)

    return app;
}










