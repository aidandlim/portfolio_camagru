import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ui_nav, camera_isload, camera_preview } from '../../../actions';

import { FiCompass, FiCamera, FiSearch, FiHeart } from 'react-icons/fi';

import './index.css';

function Footer() {
	const ui = useSelector(state => state.ui);
	const auth = useSelector(state => state.auth);
	const dispatch = useDispatch();

	function handleCamera() {
		if(auth.token !== '') {
			dispatch(ui_nav(3));
			dispatch(camera_isload(true));
			dispatch(camera_preview(''));
		} else {
			dispatch((ui_nav(1)));
			alert('You need to sign in first');
		}
	}

	return (
		<div className='footer'>
			<div className='container footer-container'>
				{ ui.nav === 0 || ui.nav === 1 ? <FiCompass className='footer-icon-active' onClick={() => dispatch(ui_nav(0))} /> : <FiCompass className='footer-icon' onClick={() => dispatch(ui_nav(0))} /> }
				{ ui.nav === 2 ? <FiSearch className='footer-icon-active' onClick={() => dispatch(ui_nav(0))} /> : <FiSearch className='footer-icon' onClick={() => dispatch(ui_nav(2))} /> }
				{ ui.nav === 3 ? <FiCamera className='footer-icon-active' onClick={() => dispatch(ui_nav(0))} /> : <FiCamera className='footer-icon' onClick={() => handleCamera()} /> }
				{ ui.nav === 4 ? <FiHeart className='footer-icon-active' onClick={() => dispatch(ui_nav(0))} /> : <FiHeart className='footer-icon' onClick={() => dispatch(ui_nav(4))} /> }
			</div>
		</div>
	);
}

export default Footer;
