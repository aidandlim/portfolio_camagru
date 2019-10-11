import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ui_nav, camera_isload, camera_images } from '../../../actions';

import axios from 'axios';

import Webcam from 'react-webcam';
import Loadcam from '../loadcam';
import Gallery from '../gallery';
import Preview from '../preview';

import { confirmAlert } from 'react-confirm-alert';
import { FiHeart, FiTrash2, FiUpload } from 'react-icons/fi';
import default_user from '../../../resources/default_user.jpg';
import './index.css';

const Camera = () => {
	const camera = useSelector(state => state.camera);
	const auth = useSelector(state => state.auth);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	const webcamRef = React.useRef(null);
	let images = camera.images;

	const _handleLoad = () => {
		setTimeout(() => {
			dispatch(camera_isload(false));
		}, 1000);
	}

	const _handleCapture = () => {
		let data = webcamRef.current.getScreenshot();
		if(data !== null) {
			images.push({
				data: data,
				rotate: 1
			});
			dispatch(camera_images(images));
		}
	}

	const _handleForm = () => {
		axios.post('/post/insert', {
			token: auth.token,
			user_id: user.user.id,
			picture: camera.preview.replace('data:image/jpeg;base64,', ''),
			rotate: camera.rotate,
			content: document.camera.content.value,
			location: document.camera.location.value,
			together: document.camera.together.value,
		})
		.then(res => {
			if(res.data) {
				dispatch(ui_nav(0));
			} else {
				confirmAlert({
					message: 'It seems like email or password information is wrong',
					buttons: [
						{
							label: 'Okay'
						}
					]
				});
			}
		});
	}

	const _handleFileUpload = () => {
		var file = document.getElementById('file').files[0];
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			images.push({
				data: reader.result,
				rotate: 0
			});
			dispatch(camera_images(images));
		}
	}

	const _handleDeleteAll = () => {
		images = [];
		dispatch(camera_images(images));
	}

	const _handleTextareaSize = () => {
		const e = document.getElementById('camera-comment-box');
		e.style.height = '5px';
		e.style.height = 'calc(' + (e.scrollHeight) + 'px - 1rem)';
	}

	return (
		<div className='camera'>
			<div className='inner-container'>
				<div className='camera-post'>
					<div className='post-profile' style={
						user.user.picture === null
						?
						{ backgroundImage: 'url(\'' + default_user + '\')' }
						:
						{ backgroundImage: 'url(\'/picture?p=' + user.user.picture + '\')' }
					}></div>
					<form name='camera'>
						<div className='post-info-container'>
							<div className='post-author'>{user.user.nickname}</div>
							<div className='post-time'>RIGHT NOW</div>
							<div className='post-in'>In</div>
							<div className='post-location'>
								<input className='camera-input' name='location' type='text' />
							</div>
							<div className='post-with'>with</div>
							<div className='post-people'>
								<input className='camera-input' name='together' type='text' />
							</div>
						</div>
						{ camera.preview === '' ? <Webcam className='camera-webcam' ref={webcamRef} screenshotFormat='image/jpeg' audio={false} onUserMedia={ () => _handleLoad() } /> : '' }
						{ camera.isLoad ? <Loadcam /> : '' }
						{ !camera.isLoad && camera.preview === '' ? <div className='camera-shoot' onClick={ () => _handleCapture() }></div> : '' }
						{ !camera.isLoad && camera.preview !== '' ? <Preview /> : '' }
						<div className='camera-margin'>
							<FiUpload className='camera-icon' onClick={ () => document.getElementById('file').click() } />	
							<input id='file' type='file' onChange={ () => _handleFileUpload() } style={{ display: 'none'}}></input>
							<FiTrash2 className='camera-icon' onClick={ () => _handleDeleteAll() }/>
						</div>
						<Gallery />
						<div className='post-reflect-container'>
							<FiHeart className='camera-icon-wide' />
							<textarea className='post-comment-box' id='camera-comment-box' name='content' placeholder='Add a comment...' onChange={ () => _handleTextareaSize() }></textarea>
							<div className='post-comment-post' onClick={() => _handleForm()}>POST</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Camera;
