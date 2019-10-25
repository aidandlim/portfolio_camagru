import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ui_nav, auth_token, auth_isaccount, user_user, user_biotemp, post_posts, post_isdone } from '../../../actions';

import axios from 'axios';
import cookie from 'react-cookies';

import { confirmAlert } from 'react-confirm-alert';
import './index.css';

const Account = () => {
	const auth = useSelector(state => state.auth);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const _handleIsPrivate = () => {
		axios.post('/user/updatePrivate', {
			token: auth.token,
			id: user.user.id,
		})
		.then(res => {
			if(res.data) {
				user.user.private = !user.user.private;
				dispatch(user_user(user.user));
			} else {
				cookie.remove('token', { path: '/'});

				dispatch(auth_token(''));
				dispatch(user_user({}));
				dispatch(user_biotemp(''));
				dispatch(ui_nav(0));

				confirmAlert({
					message: 'The session is no longer valid!',
					buttons: [
						{
							label: 'Okay'
						}
					]
				});
			}
		});
		
	}

	const _handleIsNotificate = () => {
		axios.post('/user/updateNotificate', {
			token: auth.token,
			id: user.user.id,
		})
		.then(res => {
			if(res.data) {
				user.user.notificate = !user.user.notificate;
				dispatch(user_user(user.user));
			} else {
				cookie.remove('token', { path: '/'});

				dispatch(auth_token(''));
				dispatch(user_user({}));
				dispatch(user_biotemp(''));
				dispatch(ui_nav(0));

				confirmAlert({
					message: 'The session is no longer valid!',
					buttons: [
						{
							label: 'Okay'
						}
					]
				});
			}
		});
	}

	const _handleDeleteUser = () => {
		confirmAlert({
			message: 'Are you sure to delete your account?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => _processDeleteUser()
				},
				{
					label: 'No, Thanks'
				}
			]
		});
	}

	const _processDeleteUser = () => {
		axios.post('/user/delete', {
			token:  auth.token,
			id: user.user.id
		})
		.then(res => {
			if(!res.data) {
				confirmAlert({
					message: 'The session is no longer valid!',
					buttons: [
						{
							label: 'Okay'
						}
					]
				});
			}
			cookie.remove('token', { path: '/'});

			dispatch(auth_token(''));
			dispatch(user_user({}));
			dispatch(user_biotemp(''));
			dispatch(post_posts([]));
			dispatch(post_isdone(false));
			dispatch(ui_nav(0));
		});
	}

	return (
		<div className='account'>
			<span className='account-title'>Private Account</span>
			{ user.user.private 
				? 
					<div className='account-toggle' onClick={ () => _handleIsPrivate() }>
						<div className='account-toggle-box-active'></div>
						<div className='account-toggle-button-active'></div>
					</div>
				:
					<div className='account-toggle' onClick={ () => _handleIsPrivate() }>
						<div className='account-toggle-box-inactive'></div>
						<div className='account-toggle-button-inactive'></div>
					</div>
			}
			<span className='account-title'>Send Notification</span>
			{ user.user.notificate 
				? 
					<div className='account-toggle' onClick={ () => _handleIsNotificate() }>
						<div className='account-toggle-box-active'></div>
						<div className='account-toggle-button-active'></div>
					</div>
				:
					<div className='account-toggle' onClick={ () => _handleIsNotificate() }>
						<div className='account-toggle-box-inactive'></div>
						<div className='account-toggle-button-inactive'></div>
					</div>
			}
			<div className='signin-margin'></div>
			<input className='profile-submit' type='button' value='Back to User Information' onClick={ () => dispatch(auth_isaccount()) } />
			<input className='profile-delete' type='button' value='Delete Account' onClick={ () => _handleDeleteUser() } />
		</div>
	);
}

export default Account;
