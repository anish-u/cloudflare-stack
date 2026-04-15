import { Hono } from 'hono';

type Bindings = {
	CACHE: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

// GET /:username - Fetches the public repositories of a GitHub user
app.get('/:username', async (c) => {
	const username = c.req.param('username');
	const cachedResponse = await c.env.CACHE.get(username, 'json');

	if (cachedResponse) {
		console.log('Cache hit for', username);
		return c.json(cachedResponse);
	}

	const response = await fetch(`https://api.github.com/users/${username}/repos`, {
		headers: {
			'User-Agent': 'CF-Worker Anish',
		},
	});

	const data = await response.json();
	await c.env.CACHE.put(username, JSON.stringify(data), { expirationTtl: 3600 }); // Cache for 1 hour

	return c.json(data);
});

export default app;
