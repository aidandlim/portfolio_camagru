import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ui_nav, camera_images, camera_isload, camera_preview, camera_stickers, content_post, notification_content, post_posts } from '../../../actions';

import axios from 'axios';

import { confirmAlert } from 'react-confirm-alert';
import { FiCompass, FiCamera, FiSearch, FiHeart } from 'react-icons/fi';
import './index.css';

const Footer = () => {
	const ui = useSelector(state => state.ui);
	const auth = useSelector(state => state.auth);
	const dispatch = useDispatch();

	const _handleExplore = () => {
		dispatch(ui_nav(0));
		dispatch(post_posts([]));
		dispatch(content_post({}));
	}

	const _handleCamera = () => {
		if(auth.token !== '') {
			axios.post('sticker/selectAll', {
				
			})
			.then(res => {
				dispatch(ui_nav(3));
				dispatch(camera_isload(true));
				dispatch(camera_preview(''));
				dispatch(camera_stickers(res.data));
				dispatch(camera_images([]));
			})
		} else {
			confirmAlert({
				message: 'This feature needs to be signed in first',
				buttons: [
					{
						label: 'Okay'
					}
				]
			});
		}
	}

	const _handleNotification = () => {
		if(auth.token !== '') {
			axios.post('notification/selectAll', {
				token: auth.token
			})
			.then(res => {
				dispatch(notification_content(res.data));
				dispatch(ui_nav(4));
			})
		} else {
			confirmAlert({
				message: 'This feature needs to be signed in first',
				buttons: [
					{
						label: 'Okay'
					}
				]
			});
		}
	}

	return (
		<div className='footer'>
			<div className='container footer-container'>
				{ ui.nav === 0 ? <FiCompass className='footer-icon-active' onClick={() => _handleExplore()} /> : <FiCompass className='footer-icon'  onClick={() => _handleExplore()} /> }
				{ ui.nav === 2 ? <FiSearch className='footer-icon-active' onClick={() => dispatch(ui_nav(0))} /> : <FiSearch className='footer-icon' onClick={() => dispatch(ui_nav(2))} /> }
				{ ui.nav === 3 ? <FiCamera className='footer-icon-active' onClick={() => dispatch(ui_nav(0))} /> : <FiCamera className='footer-icon' onClick={() => _handleCamera()} /> }
				{ ui.nav === 4 ? <FiHeart className='footer-icon-active' onClick={() => dispatch(ui_nav(0))} /> : <FiHeart className='footer-icon' onClick={() => _handleNotification()} /> }
			</div>
		</div>
	);
}

export default Footer;
