import 'reflect-metadata';

import { singleton, injectable, container, inject } from 'tsyringe';

@singleton()
class Database {
	constructor() {
		console.log('🟢 Database connected.');
	}

	query(sql: string) {
		console.log(`Executing query: ${sql}`);
	}
}

@singleton()
class Cache {
	constructor() {
		console.log('🟢 Cache initialized.');
	}

	set(key: string, value: string) {
		console.log(`Stored in cache: ${key} -> ${value}`);
	}
}

@singleton()
class Logger {
	constructor() {
		console.log('🟢 Logger initialized.');
	}

	log(message: string) {
		console.log(`LOG: ${message}`);
	}
}

@injectable()
class UserService {
	constructor(
		private db: Database,
		private cache: Cache,
		private logger: Logger
	) {
		console.log('UserService initialized.');
	}

	getUser(id: string) {
		this.logger.log(`Fetching user with id: ${id}`);
		this.db.query(`SELECT * FROM users WHERE id = ${id}`);
		this.cache.set(`user_${id}`, 'user_data');
		return '123';
	}
}

@injectable()
class OrderService {
	constructor(
		private db: Database,
		private logger: Logger,
		private userService: UserService
	) {
		console.log('OrderService initialized.');
	}

	placeOrder(userId: string, item: string) {
		this.logger.log(`Placing order for ${userId}: ${item}`);
		this.userService.getUser(userId);
		this.db.query(
			`INSERT INTO orders (user, item) VALUES ('${userId}', '${item}')`
		);

		return 'order_data';
	}
}

// /orders/place

const orderService = container.resolve(OrderService);
orderService.placeOrder('123', 'item_1');

console.log(`\n\n ------- \n\n`);

// Get user: /users/id
const userService = container.resolve(UserService);
userService.getUser('123');

console.log(`\n\n ------- \n\n`);

const userService2 = container.resolve(UserService);
userService2.getUser('123');

console.log(`\n\n ------- \n\n`);

const userService3 = container.resolve(UserService);
userService3.getUser('123');
