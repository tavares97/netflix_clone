import React from 'react';

const Card = ({ movie }) => {
	return (
		<div className='card'>
			<h4>{movie.title}</h4>
			<video>
				<source src={movie.thumbnail} type='video/mp4' />
			</video>
		</div>
	);
};

export default Card;
