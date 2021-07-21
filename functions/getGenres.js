const fetch = require('node-fetch');

exports.handler = async function (event) {
	const url = process.env.ASTRA_GRAPHQL_ENDPOINT;
	const limit = JSON.parse(event.body);

	const query = `
    query getAllGenre {
      reference_list(value: { label: "genre" }, options: {limit: ${JSON.stringify(
				limit
			)}}){
        values {
          value
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
