import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { camera_preview, camera_rotate, camera_filter, camera_inputs } from '../../../actions';

import './index.css';

const Gallery = () => {
	const camera = useSelector(state => state.camera);
	const dispatch = useDispatch();

	const images = camera.images;
	const preview = camera.preview;

	const _handleChoose = (i) => {
		dispatch(camera_preview(images[i].data));
		dispatch(camera_rotate(images[i].rotate));
		dispatch(camera_inputs([]));
		dispatch(camera_filter(0));
	}

	return (
		<div className='camera-gallery'>
			{ images.length === 0 ? <p>There is no image yet! Take it!</p> : '' }
			{ images.map((image, i) => 
				<img className={ preview === images[i].data ? 'camera-gallery-image-active' : 'camera-gallery-image' } key={i} src={image.data}  onClick={ () => _handleChoose(i) } alt='Rendered' />
			)}
		</div>
	);
}

export default Gallery;
