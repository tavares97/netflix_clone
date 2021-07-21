import { useEffect, useState } from 'react';

import './App.css';

import Section from './components/Section';

function App() {
	const showMoreGenres = 4;

	const [genres, setGenres] = useState(null);
	const [limit, setLimit] = useState(showMoreGenres);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('/.netlify/functions/getGenres', {
				method: 'POST',
				body: limit,
			});
			const resBody = await res.json();

			setGenres(resBody.data.reference_list.values);
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [limit]);

	return (
		<>
			{genres &&
				Object.values(genres).map(genre => (
					<Section genre={genre.value} key={genre.value} />
				))}
			<div
				className='page-end'
				onMouseEnter={() => {
					setLimit(limit + showMoreGenres);
				}}
			></div>
		</>
	);
}

export default App;
