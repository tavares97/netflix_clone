import React, { useEffect, useState } from 'react';

import Card from './Card';

const Section = ({ genre }) => {
	const [movies, setMovies] = useState(null);
	const [pageState, setPageState] = useState(null);

	const fetchData = async () => {
		const res = await fetch('/.netlify/functions/getMovies', {
			method: 'POST',
			body: JSON.stringify({ genre: genre, pageState: pageState }),
		});
		const resBody = await res.json();

		setMovies(resBody.data.movies_by_genre.values);
		setPageState(resBody.data.movies_by_genre.pageState);
	};

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div>{genre}</div>
			{movies && (
				<div className='movie-section'>
					{movies.map((movie, idx) => (
						<Card key={idx} movie={movie} />
					))}
					<div
						className='more-button'
						onClick={() => {
							setPageState(pageState);
							fetchData();
						}}
					></div>
				</div>
			)}
		</>
	);
};

export default Section;
