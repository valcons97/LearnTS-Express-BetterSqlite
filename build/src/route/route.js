"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const controller_1 = __importDefault(require("../controller/controller"));
const validator_1 = __importDefault(require("../validator/validator"));
const router = express_1.default.Router();
router.get('/getTodo', controller_1.default.getTodo);
router.post('/createTodo', validator_1.default.checkCreateTodo(), (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty()) {
        return res.status(500).json(error);
    }
    next();
}, controller_1.default.createTodo);
module.exports = {
    route: router
};
