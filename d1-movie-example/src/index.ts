import { Hono } from 'hono';

export type Bindings = {
	movie_example: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// GET /movies -> return all movies
app.get('/movies', async (c) => {
	const response = await c.env.movie_example.prepare('SELECT * FROM movie').all();
	const movies = response.results;

	return c.json(movies);
});

// GET /favorites -> return top 3 favorite movies by rating
app.get('/favorites', async (c) => {
	const response = await c.env.movie_example.prepare('SELECT * FROM movie ORDER BY rating DESC LIMIT 3').all();
	const movies = response.results;

	return c.json(movies);
});

// PUT /movies/:id -> update movie rating
app.put('/movies/:id', async (c) => {
	const id = c.req.param('id');
	const { rating } = await c.req.json();

	let ok;
	console.log(`Updating movie with id ${id} to rating ${rating}`);
	try {
		const response = await c.env.movie_example.prepare('UPDATE movie SET rating = ? WHERE id = ? RETURNING *').bind(rating, id).run();
		ok = response.success;
	} catch (error) {
		console.log(error);
		ok = false;
	}

	return c.json({ ok });
});

export default app;
