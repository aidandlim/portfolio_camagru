import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ui_isload, ui_nav, auth_token, search_user } from '../../../actions';

import axios from 'axios';
import { URL } from '../../../const';

import { confirmAlert } from 'react-confirm-alert';
import { FiUser, FiSettings, FiXCircle } from 'react-icons/fi';
import './index.css';

function Header() {
	const ui = useSelector(state => state.ui);
	const auth = useSelector(state => state.auth);
	const user = useSelector(state => state.user);
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

	function _handleMypage() {
		dispatch(ui_isload());
		axios.post(URL + 'api/search/select', {
			id: user.id
		})
		.then(res => {
			if(res.data !== null) {
				dispatch(search_user(res.data));
				dispatch(ui_nav(5));
			} else {
				confirmAlert({
					message: 'Something went wrong :(',
					buttons: [
						{
							label: 'I will try again'
						}
					]
				});
			}
		})
		.then(() => {
			dispatch(ui_isload());
		});
	}
	
	function _handleRollbackMyPage() {
		dispatch(search_user({}));
		dispatch(ui_nav(0));
	}

	return (
		<div className='header'>
			<div className='header-title' style={{
				marginRight: auth.token !== '' ? 'calc(100% - 11rem)' : 'calc(100% - 8.5rem)'
			}} onClick={() => dispatch(ui_nav(0))}>#Camagru</div>
			{ auth.token !== '' ? ui.nav === 5 ? <FiXCircle className='header-icon' onClick={() => _handleRollbackMyPage()}/> : <FiUser className='header-icon' onClick={() => _handleMypage()} /> : '' }
			{ ui.nav === 1 ? <FiXCircle className='header-icon' onClick={() => dispatch(ui_nav(0))}/> : <FiSettings className='header-icon' onClick={() => _handleInitUser()}/> }
		</div>
	);
}

export default Header;
