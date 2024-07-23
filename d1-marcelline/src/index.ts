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

		if (pathname === "/api/users") {
			// If you did not use `DB` as your binding name, change it here
			const { results } = await env.DB.prepare(
				"SELECT * FROM Users"
			).all();

			return new Response(JSON.stringify(results), {
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*', // Allow all origins
				},
			});
		}

		return new Response(
			"Call /api/users to see all users",
			{
				headers: {
					'Access-Control-Allow-Origin': '*', // Allow all origins
				},
			}
		);
	},
} satisfies ExportedHandler<Env>;
