import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { camera_preview } from '../../../actions';

import './index.css';

function GalleryPics() {
	const camera = useSelector(state => state.camera);
	const dispatch = useDispatch();

	let images = camera.images;

	return (
		<div className='camera-gallery'>
			{ images.map((image, i) => 
				<img className='camera-gallery-image' key={i} src={image} onClick={ () => dispatch(camera_preview(images[i])) } alt='Rendered' />
			)}
		</div>
);
}

export default GalleryPics;
