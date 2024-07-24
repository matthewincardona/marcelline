/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// export default {
// 	async fetch(request, env, ctx): Promise<Response> {
// 		return new Response('Hello World!');
// 	},
// } satisfies ExportedHandler<Env>;

export interface Env {
	// If you set another name in wrangler.toml as the value for 'binding',
	// replace "DB" with the variable name you defined.
	DB: D1Database;
}

export default {
	async fetch(request, env): Promise<Response> {
		const { pathname } = new URL(request.url);

		if (request.method === 'OPTIONS') {
			// Handle CORS preflight request
			return new Response(null, {
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type',
				},
			});
		}

		if (request.method === 'GET' && pathname === "/api/users") {
			const { results } = await env.DB.prepare("SELECT * FROM Users").all();
			return new Response(JSON.stringify(results), {
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*', // Allow all origins
				},
			});
		} else if (request.method === 'POST' && pathname === "/api/update-counter") {
			try {
				const requestBody: { userId: number, action: 'increment' | 'decrement' | 'clear' } = await request.json();
				const { userId, action } = requestBody;

				if (typeof userId !== 'number') {
					return new Response(JSON.stringify({ error: 'Invalid userId' }), {
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*',
						},
						status: 400,
					});
				}

				let updateQuery;
				if (action === 'increment') {
					updateQuery = "UPDATE Users SET UserCounter = UserCounter + 1 WHERE UserId = ?";
				} else if (action === 'decrement') {
					updateQuery = "UPDATE Users SET UserCounter = UserCounter - 1 WHERE UserId = ?";
				} else if (action === 'clear') {
					updateQuery = "UPDATE Users SET UserCounter = 0 WHERE UserId = ?";
				} else {
					return new Response(JSON.stringify({ error: 'Invalid action' }), {
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*',
						},
						status: 400,
					});
				}

				await env.DB.prepare(updateQuery).bind(userId).run();
				return new Response(JSON.stringify({ message: `User counter ${action}ed` }), {
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
					},
				});
			} catch (error) {
				return new Response(JSON.stringify({ error: 'Invalid request body' }), {
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
					},
					status: 400,
				});
			}
		}

		return new Response("Call /api/users to see all users", {
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		});
	},
} satisfies ExportedHandler<Env>;
