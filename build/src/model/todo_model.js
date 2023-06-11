"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const connect_1 = __importDefault(require("../database/connect"));
// getTodo
function getTodo() {
    return connect_1.default.db.prepare('SELECT * FROM todo').all();
}
// Create
function create(title) {
    return connect_1.default.db.prepare('INSERT INTO todo (title,complete) values(?,?)').run(title, 0);
}
module.exports = {
    getTodo,
    create
};
