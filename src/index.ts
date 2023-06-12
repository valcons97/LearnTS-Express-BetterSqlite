import { createApp } from "./app";
import config from "./config/config";

const startServer = async () => {
	const port = config.port;
	const app = await createApp();
	app.listen(port, () => {
		console.log(`[server]:Server is running at https://localhost:${port}`);
	});
};

startServer();
