import React from 'react';
import $ from 'jquery';

import Webcam from "react-webcam";
import { FiChevronDown, FiChevronsLeft, FiChevronsRight, FiCheck, FiHeart, FiMoreVertical } from 'react-icons/fi';

import './index.css';

function Camera() {
	const webcamRef = React.useRef(null);

	function cameraReady() {
		$('.camera-loading').delay(1000).fadeOut(500);
		$('.camera-shoot').delay(1000).fadeIn(500);
	}

	let images = [];

	function capture() {
		const image = webcamRef.current.getScreenshot();
		images[images.length] = image;
		render();
	}

	let index = 0;

	function handleIndex(direction) {
		if(direction === 'left') {
			if(images.length - index > 5)
				index++;
		} else {
			if(images.length - index < images.length)
				index--;
		}
		render();
		rollback();
	}

	function render() {
		$('.camera-gallery-container').html("");
		for(let i = images.length - 5 - index; i < images.length - index; i++) {
			if(images[i] !== undefined)
				$('.camera-gallery-container').html($('.camera-gallery-container').html() + `<div class='camera-gallery-image' style='background: url("${images[i]}"); background-position: center; background-size: cover;'/>`);
		}
	}

	function preview(num) {
		let number = 0;
		if(images.length < 5) {
			number = num;
		} else {
			number = images.length - 5 - index + num;
		}
		const preview = `<div class='camera-preview-image' style='background: url("${images[number]}"); background-position: center; background-size: cover;'/>`;
		$('.camera-galley-check-icon').css('display', 'none');
		$('.camera-preview-container').html(preview);
		$('.camera-galley-check-icon').eq(num).css('display', 'block');
		$('.camera-shoot').fadeOut(0);
		$('.camera-preview-container').fadeIn(0);
		$('.camera-rollback').fadeIn(0);
	}

	function rollback() {
		$('.camera-galley-check-icon').css('display', 'none');
		$('.camera-shoot').fadeIn(0);
		$('.camera-preview-container').fadeOut(0);
		$('.camera-rollback').fadeOut(0);
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
					<Webcam
						className='camera-webcam'
						width={1600}
						height={900}
						audio={false}
						ref={webcamRef}
						screenshotFormat='image/jpeg'
						onUserMedia={ () => cameraReady() }
					/>
					<div className='camera-loading'>
						<div className='camera-loading-img'></div>
					</div>
					<div className='camera-preview-container'></div>
					<div className='camera-shoot' onClick={ () => capture() }></div>
					<FiChevronDown className='camera-rollback' onClick={ () => rollback() } />
					<div className='camera-gallery'>
						<div className='camera-gallery-arrow' onClick={ () => handleIndex('left') }><FiChevronsLeft className='camera-gallery-arrow-icon' /></div>
						<div className='camera-gallery-container'></div>
						<div className='camera-gallery-check'>
							<div className='camera-gallery-check-zone' onClick={ () => preview(0) }>
								<FiCheck className='camera-galley-check-icon' />
							</div>
							<div className='camera-gallery-check-zone' onClick={ () => preview(1) }>
								<FiCheck className='camera-galley-check-icon' />
							</div>
							<div className='camera-gallery-check-zone' onClick={ () => preview(2) }>
								<FiCheck className='camera-galley-check-icon' />
							</div>
							<div className='camera-gallery-check-zone' onClick={ () => preview(3) }>
								<FiCheck className='camera-galley-check-icon' />
							</div>
							<div className='camera-gallery-check-zone' onClick={ () => preview(4) }>
								<FiCheck className='camera-galley-check-icon' />
							</div>
						</div>
						<div className='camera-gallery-arrow' onClick={ () => handleIndex('right') }><FiChevronsRight className='camera-gallery-arrow-icon' /></div>
					</div>
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
