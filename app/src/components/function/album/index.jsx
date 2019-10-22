import React from 'react';

import { useDispatch } from 'react-redux';
import { ui_nav, content_post } from '../../../actions';

import axios from 'axios';

import './index.css';

const Album = (props) => {
	const dispatch = useDispatch();

	const _handleProfilePage = () => {
		axios.post('/post/select', {
			id: props.data.id
		})
		.then(res => {
			if(res.data !== null) {
				dispatch(content_post(res.data));
				dispatch(ui_nav(6));
			}
		});
	}

	return (
		<div className={props.data.rotate ? 'album rotate' : 'album'} 
			style={{ 
				backgroundImage: 'url(\'/picture?p=' + props.data.picture + '\')' 
			}} onClick={() => _handleProfilePage()}>
		</div>
	);
}

export default Album;
