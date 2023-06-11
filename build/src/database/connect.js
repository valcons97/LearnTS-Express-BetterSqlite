"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const db = new better_sqlite3_1.default('src/database/todo.db', { verbose: console.log });
db.pragma('journal_mode = WAL');
const createTable = "CREATE TABLE IF NOT EXISTS todo \
                    ('id' INTEGER PRIMARY KEY AUTOINCREMENT, \
                    'title' varchar NOT NULL,\
                    'complete' BOOLEAN);";
db.exec(createTable);
module.exports = {
    db
};
