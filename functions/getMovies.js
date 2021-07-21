const fetch = require('node-fetch');

exports.handler = async function (event) {
	const url = process.env.ASTRA_GRAPHQL_ENDPOINT;
	const genre = JSON.parse(event.body).genre;
	const pageState = JSON.parse(event.body).pageState;

	const query = `
    query getMovieAction {
      movies_by_genre(value: { genre: ${JSON.stringify(
				genre
			)} }, orderBy: [year_DESC], options: {pageSize: 4, pageState: ${JSON.stringify(
		pageState
	)}}) {
        values {
          year
          title
          duration
          synopsis
          thumbnail
        }
				pageState
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
