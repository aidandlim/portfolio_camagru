import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ui_nav, camera_isload, camera_preview, content_id, notification_content } from '../../../actions';

import axios from 'axios';
import { URL } from '../../../const';

import { FiCompass, FiCamera, FiSearch, FiHeart } from 'react-icons/fi';

import { confirmAlert } from 'react-confirm-alert';

import './index.css';

function Footer() {
	const ui = useSelector(state => state.ui);
	const auth = useSelector(state => state.auth);
	const dispatch = useDispatch();

	function _handleCamera() {
		if(auth.token !== '') {
			dispatch(ui_nav(3));
			dispatch(camera_isload(true));
			dispatch(camera_preview(''));
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

	function _handleNotification() {
		if(auth.token !== '') {
			axios.post(URL + 'api/notification/selectAll', {
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
				{ ui.nav === 0 || ui.nav === 1 ? <FiCompass className='footer-icon-active' onClick={() => {dispatch(ui_nav(0)); dispatch(content_id(-1))}} /> : <FiCompass className='footer-icon'  onClick={() => {dispatch(ui_nav(0)); dispatch(content_id(-1))}} /> }
				{ ui.nav === 2 ? <FiSearch className='footer-icon-active' onClick={() => dispatch(ui_nav(0))} /> : <FiSearch className='footer-icon' onClick={() => dispatch(ui_nav(2))} /> }
				{ ui.nav === 3 ? <FiCamera className='footer-icon-active' onClick={() => dispatch(ui_nav(0))} /> : <FiCamera className='footer-icon' onClick={() => _handleCamera()} /> }
				{ ui.nav === 4 ? <FiHeart className='footer-icon-active' onClick={() => dispatch(ui_nav(0))} /> : <FiHeart className='footer-icon' onClick={() => _handleNotification()} /> }
			</div>
		</div>
	);
}

export default Footer;
