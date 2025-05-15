import 'reflect-metadata';

import { injectable, inject, container } from 'tsyringe';

@injectable()
class ApiService {
	constructor(@inject('Config') private config: { apiUrl: string }) {}

	fetchData() {
		console.log(`Fetching data from ${this.config.apiUrl}`);
	}
}

const config = { apiUrl: 'https://api.stacklearner.com' };
container.register('Config', { useValue: config });

container.register('Config', {
	useValue: { apiUrl: 'https://api.google.com' },
});
const apiService = container.resolve(ApiService);
apiService.fetchData();
