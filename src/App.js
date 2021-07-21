import { useEffect, useState } from 'react';

import './App.css';

import Section from './components/Section';

function App() {
	const [genres, setGenres] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('/.netlify/functions/getGenres');
			const resBody = await res.json();

			setGenres(resBody.data.reference_list.values);
		};

		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{genres &&
				Object.values(genres).map(genre => (
					<Section genre={genre.value} key={genre.value} />
				))}
		</>
	);
}

export default App;
