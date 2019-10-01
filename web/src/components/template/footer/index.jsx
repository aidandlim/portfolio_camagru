import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ui_nav, camera_isload, camera_preview, content_id } from '../../../actions';

import { FiImage, FiCompass, FiCamera, FiSearch, FiHeart } from 'react-icons/fi';

import { confirmAlert } from 'react-confirm-alert';

import './index.css';

function Footer() {
	const ui = useSelector(state => state.ui);
	const auth = useSelector(state => state.auth);
	const content = useSelector(state => state.content);
	const dispatch = useDispatch();

	function handleCamera() {
		if(auth.token !== '') {
			dispatch(ui_nav(3));
			dispatch(camera_isload(true));
			dispatch(camera_preview(''));
		} else {
			dispatch((ui_nav(1)));
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
				{ (ui.nav === 0 || ui.nav === 1) && content.id !== -1 ? <FiImage className='footer-icon-active' onClick={() => dispatch(content_id(-1))} /> : '' }
				{ (ui.nav === 0 || ui.nav === 1) && content.id === -1 ? <FiCompass className='footer-icon-active' onClick={() => {dispatch(ui_nav(0)); dispatch(content_id(-1))}} /> : <FiCompass className='footer-icon'  onClick={() => {dispatch(ui_nav(0)); dispatch(content_id(-1))}} /> }
				{ ui.nav === 2 ? <FiSearch className='footer-icon-active' onClick={() => dispatch(ui_nav(0))} /> : <FiSearch className='footer-icon' onClick={() => dispatch(ui_nav(2))} /> }
				{ ui.nav === 3 ? <FiCamera className='footer-icon-active' onClick={() => dispatch(ui_nav(0))} /> : <FiCamera className='footer-icon' onClick={() => handleCamera()} /> }
				{ ui.nav === 4 ? <FiHeart className='footer-icon-active' onClick={() => dispatch(ui_nav(0))} /> : <FiHeart className='footer-icon' onClick={() => dispatch(ui_nav(4))} /> }
			</div>
		</div>
	);
}

export default Footer;
