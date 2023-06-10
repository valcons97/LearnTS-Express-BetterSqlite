import express, { Request, Response } from 'express';

import bodyParser from 'body-parser';


const app = express();

const port = 9000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get("/", (req: Request, res: Response) => {
    return res.send('hello world')
})

app.listen(port, () => {
    console.log('Server is running on port ' + port);
})
