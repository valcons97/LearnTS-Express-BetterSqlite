import connect from '../database/connect';

import uuid from 'uuid';

// Create
function create(title: String) {
    return connect.db.prepare('INSERT INTO todo (id,title,complete) values(?,?,?)').run(uuid.v4, title, false);
}

export = {
    create
}
