import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { camera_isload, camera_images, camera_preview } from '../../../actions';

import Webcam from 'react-webcam';
import Loadcam from '../loadcam';
import Gallery from '../gallery';

import { FiChevronDown, FiHeart, FiMoreVertical } from 'react-icons/fi';
import './index.css';

function Camera() {
	const camera = useSelector(state => state.camera);
	const dispatch = useDispatch();

	const webcamRef = React.useRef(null);
	let images = camera.images;
	let preview = camera.preview;

	function load() {
		setTimeout(() => {
			dispatch(camera_isload(false));
		}, 1000);
	}

	function capture() {
		images.push(webcamRef.current.getScreenshot());
		dispatch(camera_images(images));
	}

	return (
		<div className='camera'>
			<div className='inner-container'>
				<div className='camera-post'>
					<div className='post-profile'></div>
					<div className='post-info-container'>
						<div className='post-author'>Ariana Grande</div>
						<div className='post-time'>RIGHT NOW</div>
						<div className='post-in'>In</div>
						<div className='post-location'>
							<input className='camera-input' type='text' />
						</div>
						<div className='post-with'>with</div>
						<div className='post-people'>
							<input className='camera-input' type='text' />
						</div>
					</div>
					<Webcam className='camera-webcam' ref={webcamRef} screenshotFormat='image/jpeg' audio={false} onUserMedia={ () => load() } />
					{ camera.isLoad ? <Loadcam /> : '' }
					{ !camera.isLoad && camera.preview === '' ? <div className='camera-shoot' onClick={ () => capture() }></div> : '' }
					{ !camera.isLoad && camera.preview !== '' ? <img className='camera-preview' src={preview} alt='Rendered' /> : '' }
					{ !camera.isLoad && camera.preview !== '' ? <FiChevronDown className='camera-rollback' onClick={ () => dispatch(camera_preview('')) } /> : '' }
					<Gallery />
					<div className='post-reflect-container'>
						<FiHeart className='post-icon' />
						<FiMoreVertical className='post-icon' />
						<div className='post-content' contentEditable='true' data-placeholder='Add a comment...'></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Camera;
