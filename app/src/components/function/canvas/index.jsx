import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { camera_inputs } from '../../../actions';

import './index.css';

const Canvas = () => {
	let camera = useSelector(state => state.camera);
	const dispatch = useDispatch();

	let absoluteX = 0;
	let absoluteY = 0;

	const _handleDrag = (e) => {
		absoluteX = !absoluteX ? e.clientX : absoluteX;
		absoluteY = !absoluteY ? e.clientY + document.getElementById('camera').scrollTop : absoluteY;
		e.target.style.left = e.clientX - absoluteX + 'px';
		e.target.style.top = e.clientY - absoluteY + document.getElementById('camera').scrollTop + 'px';
	}

	const _handleRemove = () => {
		dispatch(camera_inputs([]));
	}

	document.addEventListener("dragover", function(event) {
		event.preventDefault();
	}, false);

	document.addEventListener("dragstart", function(event) {
		let img = document.createElement("img");
		event.dataTransfer.setDragImage(img, 0, 0);
	}, false);

	return (
		<div className='canvas'>
			{camera.inputs.map((input, index) =>
				<div id={'canvas-sticker-' + index} className={'canvas-sticker preview-filter-' + camera.filter} style={{ backgroundImage: 'url(\'/sticker?s=' + input + '\')'}} key={index} onDrag={_handleDrag} onDoubleClick={() => _handleRemove()} draggable></div>	
			)}
		</div>
	);
}

export default Canvas;
