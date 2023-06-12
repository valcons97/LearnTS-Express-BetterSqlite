// // getTodo
// function getTodo() {
//     return connect.db.prepare('SELECT * FROM todo').all();
// }

// // Create
// function create(title: String) {
//     return connect.db.prepare('INSERT INTO todo (title,complete) values(?,?)').run(title, 0);
// }

// export = {
//     getTodo,
//     create
// }

export class Todo {
    readonly id: number | bigint;
    readonly title: string;
    readonly complete: number;

    constructor(
        id: number | bigint,
        title: string,
        complete: number,

    ) {
        this.id = id;
        this.title = title;
        this.complete = complete;

    }
}
