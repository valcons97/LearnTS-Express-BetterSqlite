"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const connect_1 = __importDefault(require("../database/connect"));
const uuid_1 = require("uuid");
// getTodo
function getTodo() {
    return connect_1.default.db.prepare('SELECT * FROM todo').all();
}
// Create
function create(title) {
    return connect_1.default.db.prepare('INSERT INTO todo (id,title,complete) values(?,?,?)').run((0, uuid_1.v4)(), title, 0);
}
module.exports = {
    getTodo,
    create
};
