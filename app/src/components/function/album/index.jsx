import React from 'react';

import { useDispatch } from 'react-redux';
import { ui_nav, content_post } from '../../../actions';

import axios from 'axios';

import { isMobile } from "react-device-detect";

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
		<div className={isMobile ? 'album album-mobile' : 'album'} onClick={() => _handleProfilePage()}>
			<img className='album-picture' src={'/picture?p=' + props.data.picture} onLoad={ () => document.getElementById('album-load-' + props.data.id).style.display = 'none' } alt='post' />
			<div id={'album-load-' + props.data.id} className={isMobile ? 'album-load album-load-mobile' : 'album-load'}><div className='slider'></div></div>
		</div>
	);
}

export default Album;
