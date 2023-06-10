"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../controller/controller"));
const router = express_1.default.Router();
router.get('/getTodo', controller_1.default.getTodo);
router.get('/createTodo', controller_1.default.createTodo);
module.exports = {
    route: router
};
