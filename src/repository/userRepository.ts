import { Database } from "better-sqlite3";
import User from "../model/user";
import { Inject, Service } from "typedi";
import diConfig from "../config/di";

export type FindUserFilter = {
	id?: number | bigint;
	email?: string;
};

@Service()
export class UserRepository {
	private db: Database;

	constructor(
		@Inject(diConfig.database)
		db: Database
	) {
		this.db = db;
	}

	public async findUser(filter: FindUserFilter): Promise<User | null> {
		let query = "SELECT id, email, password, created_at FROM users";

		let args: number | bigint | string;
		if (filter.id) {
			query = `${query} WHERE id = ?`;
			args = filter.id!;
		} else if (filter.email) {
			query = `${query} WHERE email = ?`;
			args = filter.email!;
		} else {
			// should never happen
			throw Error(`Unexpected value for findUser() filter ${filter}`);
		}

		query = `${query} LIMIT 1`;

		try {
			const row = this.db.prepare(query).get(args);
			if (row == undefined) {
				return null;
			}

			const castRow = row as { [key: string]: any };
			return new User(
				castRow.id,
				castRow.email,
				castRow.password,
				new Date(castRow.created_at)
			);
		} catch (e) {
			throw Error(`Failed to execute SELECT query for findUser, e: ${e}`);
		}
	}

	public async createUser(email: string, password: string): Promise<User> {
		try {
			const stmt = this.db.prepare(
				"INSERT INTO users (email, password) VALUES (?, ?)"
			);
			stmt.run(email, password);
		} catch (e) {
			throw new Error(`Failed to insert user, e: ${e}`);
		}

		return (await this.findUser({ email: email })) as User;
	}
}
