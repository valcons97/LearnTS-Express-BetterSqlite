"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const route_1 = __importDefault(require("./route/route"));
const app = (0, express_1.default)();
const port = 9000;
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// app.get("/", (req: Request, res: Response) => {
//     return res.send('hello world')
// })
app.use('/', route_1.default.route);
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
