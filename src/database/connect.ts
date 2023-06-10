import Database from 'better-sqlite3';

const db = new Database('src/database/todo.db', { verbose: console.log },
);
db.pragma('journal_mode = WAL');

const createTable = "CREATE TABLE IF NOT EXISTS users('name' varchar, 'surname' varchar, 'date_of_birth' DATE DEFAULT, 'email' varchar, 'username' varchar PRIMARY KEY, 'password' varchar );"

db.exec

export = {
    db
}
