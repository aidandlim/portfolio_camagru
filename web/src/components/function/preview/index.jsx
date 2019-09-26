import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { camera_isload, camera_preview, camera_filter } from '../../../actions';

import { FiChevronDown } from 'react-icons/fi';
import './index.css';

function Preview() {
	const camera = useSelector(state => state.camera);
	const dispatch = useDispatch();

	const preview = camera.preview;
	const filter = camera.filter;

	function rollback() {
		dispatch(camera_isload(true));
		dispatch(camera_preview(''));
	}

	return (
		<div className='preview'>
			<img className={'preview-image preview-filter-' + filter} src={preview} alt='Rendered' />
			<FiChevronDown className='preview-rollback' onClick={ () => rollback() } />
			<img className={'preview-filter preview-filter-' + filter} src={preview} alt='Rendered' onClick={ () => dispatch(camera_filter(filter === 2 ? 0 : filter + 1)) } / >
			<div className='preview-filter-title' onClick={ () => dispatch(camera_filter(filter === 2 ? 0 : filter + 1)) }>
				{filter === 0 ? 'Original' : ''}
				{filter === 1 ? 'Black & White' : ''}
				{filter === 2 ? 'Sephia' : ''}
			</div>
		</div>
	);
}

export default Preview;
