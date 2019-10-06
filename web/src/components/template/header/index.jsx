import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ui_nav, auth_token } from '../../../actions';

import axios from 'axios';
import { URL } from '../../../const';

import { FiUser, FiSettings, FiXCircle } from 'react-icons/fi';

import './index.css';

function Header() {
	const ui = useSelector(state => state.ui);
	const auth = useSelector(state => state.auth);
	const dispatch = useDispatch();

	function _handleInitUser() {
		axios.post(URL + 'api/auth/isLogin', {
			token: auth.token
		})
		.then(res => {
			if(res.data) {
				dispatch(auth_token(auth.token));
			} else {
				dispatch(auth_token(''));
			}
			dispatch(ui_nav(1));
		})
	}

	return (
		<div className='header'>
			<div className='header-title' style={{
				marginRight: auth.token !== '' ? 'calc(100% - 11rem)' : 'calc(100% - 8.5rem)'
			}} onClick={() => dispatch(ui_nav(0))}>#Camagru</div>
			{ auth.token !== '' ? <FiUser className='header-icon' /> : '' }
			{ ui.nav === 1 ? <FiXCircle className='header-icon' onClick={() => dispatch(ui_nav(0))}/> : <FiSettings className='header-icon' onClick={() => _handleInitUser()}/> }
		</div>
	);
}

export default Header;
