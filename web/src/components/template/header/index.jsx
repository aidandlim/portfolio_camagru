import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ui_nav, auth_id, auth_email, auth_nickname } from '../../../actions';

import axios from 'axios';
import { URL } from '../../../const';

import { FiUser, FiXCircle } from 'react-icons/fi';

import './index.css';

function Header() {
	const ui = useSelector(state => state.ui);
	const dispatch = useDispatch();

	function openUser() {
		axios.get(URL + 'api/user/isLogin')
		.then(res => {
			if(res.data.id !== -1) {
				dispatch(auth_id(res.data.id));
				dispatch(auth_email(res.data.email));
				dispatch(auth_nickname(res.data.nickname));
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
