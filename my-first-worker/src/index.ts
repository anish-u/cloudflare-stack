import { Hono } from 'hono';

export interface Env {
	AI: Ai;
}

const app = new Hono<{ Bindings: Env }>();

// GET /?query="How is your day today?"
app.get('/', async (c) => {
	// const url = new URL(c.req.url);
	// const content = url.searchParams.get('query');

	const ai = c.env.AI;

	const content = c.req.query('query') || 'How is your day today?';

	const messages = [
		{ role: 'system', content: 'You are a helpful assistant.' },
		{ role: 'user', content },
	];

	const res = await ai.run('@cf/mistral/mistral-7b-instruct-v0.1', {
		messages,
	});

	return c.json(res);
});

export default app;
