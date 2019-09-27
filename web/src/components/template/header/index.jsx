import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ui_nav, auth_token } from '../../../actions';

import axios from 'axios';
import { URL } from '../../../const';

import { FiUser, FiXCircle } from 'react-icons/fi';

import './index.css';

function Header() {
	const ui = useSelector(state => state.ui);
	const auth = useSelector(state => state.auth);
	const dispatch = useDispatch();

	function openUser() {
		axios.post(URL + 'api/user/isLogin', {
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
			<div className='header-title' onClick={() => window.location.reload()}>#Camagru</div>
			{ ui.nav === 1 ? <FiXCircle className='header-icon' onClick={() => dispatch(ui_nav(0))}/> : <FiUser className='header-icon' onClick={() => openUser()}/> }
		</div>
	);
}

export default Header;
