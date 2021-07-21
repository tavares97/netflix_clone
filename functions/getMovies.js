const fetch = require('node-fetch');

exports.handler = async function () {
	const url = process.env.ASTRA_GRAPHQL_ENDPOINT;

	const query = `
    query getMovieAction {
      movies_by_genre(value: { genre: "Sci-Fi" }, orderBy: [year_DESC]) {
        values {
          year
          title
          duration
          synopsis
          thumbnail
        }
      }
    }
  `;

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'x-cassandra-token': process.env.ASTRA_TOKEN,
		},
		body: JSON.stringify({ query }),
	});

	try {
		const responseBody = await response.json();

		return {
			statusCode: 200,
			body: JSON.stringify(responseBody),
		};
	} catch (err) {
		console.error_(err.message);

		return {
			statusCode: 500,
			body: JSON.stringify(err),
		};
	}
};
