import connect from '../database/connect';

// getTodo
function getTodo() {
    return connect.db.prepare('SELECT * FROM todo').all();
}

// Create
function create(title: String) {
    return connect.db.prepare('INSERT INTO todo (title,complete) values(?,?)').run(title, 0);
}

export = {
    getTodo,
    create
}
