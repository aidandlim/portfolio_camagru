import React from 'react';
import $ from 'jquery';

import Webcam from "react-webcam";
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';

import './index.css';

function Camera() {
	const webcamRef = React.useRef(null);

	function cameraReady() {
		$('.camera-loading').delay(1000).fadeOut(500);
		$('.camera-shoot').delay(1000).fadeIn(500);
	}

	let images = [];

	function capture() {
		const imageBase64 = webcamRef.current.getScreenshot();
		const image = `<div class='camera-gallery-image' style='background: url("${imageBase64}"); background-position: center; background-size: cover;'/>`;
		images[images.length] = image;
		render();
	}

	let index = 0;

	function handleIndex(direction) {
		if(direction === 'left') {
			if(images.length - index > 3)
				index++;
		} else {
			if(images.length - index < images.length)
				index--;
		}
		render();
	}

	function render() {
		$('.camera-gallery-container').html("");
		for(let i = images.length - 3 - index; i < images.length - index; i++) {
			if(images[i] !== undefined)
				$('.camera-gallery-container').html($('.camera-gallery-container').html() + images[i]);
		}
	}

	return (
		<div className='camera'>
			<div className='inner-container'>
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
				<div className='camera-shoot' onClick={ () => capture() }></div>
				<div className='camera-gallery'>
					<div className='camera-gallery-arrow' onClick={ () => handleIndex('left') }><FiChevronsLeft className='camera-gallery-arrow-icon' /></div>
					<div className='camera-gallery-container'></div>
					<div className='camera-gallery-arrow' onClick={ () => handleIndex('right') }><FiChevronsRight className='camera-gallery-arrow-icon' /></div>
				</div>
			</div>
		</div>
	);
}

export default Camera;
