"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const connect_1 = __importDefault(require("../database/connect"));
const uuid_1 = __importDefault(require("uuid"));
// Create
function createTodo(title) {
    return connect_1.default.db.prepare('Insert INTO todo (id,title,complete) values(?,?,?)').run(uuid_1.default.v4, title, false);
}
module.exports = {
    createTodo
};
