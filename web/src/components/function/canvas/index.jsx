import React from 'react';

import { useSelector } from 'react-redux';

import './index.css';

const Canvas = () => {
	const camera = useSelector(state => state.camera);

	return (
		<div className='canvas'>
			{camera.inputs.map((input, index) =>
				<div className='canvas-sticker' style={{ backgroundImage: 'url(\'/sticker?s=' + input + '\')'}} key={index}></div>	
			)}
		</div>
	);
}

export default Canvas;
