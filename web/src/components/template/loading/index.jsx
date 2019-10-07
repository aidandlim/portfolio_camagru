import React from 'react';

import LoadingGif from '../../../resources/loading.gif';
import './index.css';

function Loading() {

	return (
		<div className='loading'>
			<img className='loading-img' src={LoadingGif} alt='loading'></img>
		</div>
	);
}

export default Loading;
