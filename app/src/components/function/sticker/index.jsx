import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { camera_inputs } from '../../../actions';

import './index.css';

const Sticker = () => {
	const camera = useSelector(state => state.camera);
	let inputs = camera.inputs;
	const dispatch = useDispatch();

	const _handleStickers = (name) => {
		inputs.push(
			name
		);
		dispatch(camera_inputs(inputs));
	}

	return (
		<div className='sticker'>
			{camera.stickers.sort().map((sticker, index) => 
				<div className='sticker-image' key={index} style={{ backgroundImage: 'url(\'/sticker?s=' + sticker + '\')' }} onClick={ () => _handleStickers(sticker) } />
			)}
		</div>
	);
}

export default Sticker;