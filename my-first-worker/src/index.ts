import { Hono } from 'hono';

export interface Env {}

const app = new Hono<{Bindings: Env}>();

app.get( '/', (c) => {
		console.log(c.req);
		return c.json({
			message: 'Hello World!',
		});
	}
);

export default app;
