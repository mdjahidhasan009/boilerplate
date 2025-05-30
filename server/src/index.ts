import { createApp } from '@/app';
import http from 'http';
import { registerDependencies } from './registry';
import config from "config";

const port = config.get<number>('port') || 3000;
let server: http.Server;

async function main() {
	try {
		await registerDependencies();
		const app = createApp();

		server = http.createServer(app);

		server.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	} catch (error) {
		console.error('Failed to start the server', error);
		process.exit(1);
	}
}

main();
