import Database from 'better-sqlite3';

const db = new Database('todo.db', { verbose: console.log });

db.pragma('journal_mode = WAL');

export = {
    db
}
