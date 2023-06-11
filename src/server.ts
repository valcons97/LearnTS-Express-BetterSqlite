import express, { Request, Response } from 'express';
import router from './route/route'

const app = express();

const port = 9000;

app.use(express.json())

// app.get("/", (req: Request, res: Response) => {
//     return res.send('hello world')
// })

app.use('/', router.route)

app.listen(port, () => {
    console.log('Server is running on port ' + port);
})
