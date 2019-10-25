import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ui_nav, post_posts, post_isdone, auth_token, user_user, user_biotemp, camera_isload, camera_images } from '../../../actions';

import axios from 'axios';
import cookie from 'react-cookies';

import { isMobile } from "react-device-detect";

import Webcam from 'react-webcam';
import Loadcam from '../loadcam';
import Gallery from '../gallery';
import Preview from '../preview';
import Sticker from '../sticker';
import Canvas from '../canvas';

import { confirmAlert } from 'react-confirm-alert';
import { FiHeart, FiTrash2, FiUpload, FiCamera } from 'react-icons/fi';
import default_user from '../../../resources/default_user.png';
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
		document.getElementById('shutter').classList.add("camera-shutter-on");
		setTimeout(() => {
			document.getElementById('shutter').classList.remove("camera-shutter-on");
		}, 150);
		const data = webcamRef.current.getScreenshot();
		if(data !== null) {
			images.push({
				data: data
			});
			dispatch(camera_images(images));
		}
	}

	const _handleForm = () => {
		if(camera.preview === '') {
			confirmAlert({
				message: 'It needs to be choosen picture first',
				buttons: [
					{
						label: 'Okay'
					}
				]
			});
		} else {
			document.getElementById('cover').style.display = 'block';
			let stickers = [];
			for(let i = 0; i < camera.inputs.length; i++) {
				let target = document.getElementById('canvas-sticker-' + i);
				stickers.push({
					name: camera.inputs[i],
					x: parseInt(target.style.left) / parseInt(document.getElementById('preview').offsetWidth),
					y: parseInt(target.style.top) / parseInt(document.getElementById('preview').offsetWidth),
				});
			}
			axios.post('/post/insert', {
				token: auth.token,
				user_id: user.user.id,
				picture: camera.preview.replace('data:image/jpeg;base64,', '')
									.replace('data:image/jpg;base64,', '')
									.replace('data:image/png;base64,', ''),
				content: document.camera.content.value,
				location: document.camera.location.value,
				together: document.camera.together.value,

				stickers: stickers,
				filter: camera.filter,
			})
			.then(res => {
				if(res.data) {
					dispatch(post_posts([]));
					dispatch(post_isdone(false));
					dispatch(ui_nav(0));
					setTimeout(() => {
						document.getElementById('cover').style.display = 'none';
					}, 1000);
				} else {
					cookie.remove('token', { path: '/'});

					dispatch(auth_token(''));
					dispatch(user_user({}));
					dispatch(user_biotemp(''));
					dispatch(ui_nav(0));

					confirmAlert({
						message: 'The session is no longer valid!',
						buttons: [
							{
								label: 'Okay'
							}
						]
					});
				}
			});
		}
	}

	const _handleFileUpload = () => {
		let input = document.getElementById('file');
		let extension = input.value.split('.')[input.value.split('.').length - 1];
		if(extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
			let file = input.files[0];
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				images.push({
					data: reader.result
				});
				dispatch(camera_images(images));
			}
		} else {
			input.value = '';
			confirmAlert({
				message: 'Extension of image can be only .jpg, .jpeg, .png!',
				buttons: [
					{
						label: 'Okay'
					}
				]
			});
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
		<div id='camera' className='camera'>
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
						{ camera.preview === '' 
							? 
							<Webcam className='camera-webcam' ref={webcamRef}
								screenshotFormat='image/jpeg'
								audio={false}
								onUserMedia={ () => _handleLoad() }
							/> 
							:
							''
						}
						{ camera.isLoad ? (isMobile ? <FiCamera className='camera-mobile-upload' onClick={ () => document.getElementById('file').click() } /> : <Loadcam />) : '' }
						{ !camera.isLoad && camera.preview === '' ? <div className='camera-shoot' onClick={ () => _handleCapture() }></div> : '' }
						{ !camera.isLoad && camera.preview === '' ? <div id='shutter' className='camera-shutter'></div> : '' }
						{ (!camera.isLoad || isMobile) && camera.preview !== '' ? <Preview /> : '' }
						{ !camera.isLoad && camera.preview !== '' ? <Canvas /> : '' }
						<div className='camera-margin'>
							<FiUpload className='camera-icon' onClick={ () => document.getElementById('file').click() } />	
							<input id='file' type='file' onChange={ () => _handleFileUpload() } style={{ display: 'none'}}></input>
							<FiTrash2 className='camera-icon' onClick={ () => _handleDeleteAll() }/>
						</div>
						<Gallery />
						{ !camera.isLoad && camera.preview !== '' && !isMobile ? <Sticker /> : '' }
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
