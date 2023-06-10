import connect from '../database/connect';

import uuid from 'uuid';

// Create
function createTodo(title: String) {
    return connect.db.prepare('Insert INTO todo (id,title,complete) values(?,?,?)').run(uuid.v4, title, false);
}

export = {
    createTodo
}
