import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth_token, auth_isaccount, user_user } from '../../../actions';

import axios from 'axios';

import { confirmAlert } from 'react-confirm-alert';
import './index.css';

function Account() {
	const auth = useSelector(state => state.auth);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	function _handleIsPrivate() {
		axios.post('/user/updatePrivate', {
			token: auth.token,
			id: user.user.id,
		})
		.then(res => {
			if(res.data) {
				user.user.private = !user.user.private;
				dispatch(user_user(user.user));
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
		});
		
	}

	function _handleIsNotificate() {
		axios.post('/user/updateNotificate', {
			token: auth.token,
			id: user.user.id,
		})
		.then(res => {
			if(res.data) {
				user.user.notificate = !user.user.notificate;
				dispatch(user_user(user.user));
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
		});
	}

	function _handleDeleteUser() {
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

	function _processDeleteUser() {
		if(window.confirm('Are you sure?')) {
			axios.post('/user/delete', {
				id: user.user.id,
			})
			.then(res => {
				if(res.data) {
					dispatch(auth_token(''));
					dispatch(user_user({}));
					dispatch(auth_isaccount(false));
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
			});
		}
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
			<input className='profile-logout' type='button' value='Back to User Information' onClick={ () => dispatch(auth_isaccount()) } />
			<input className='profile-delete' type='button' value='Delete Account' onClick={ () => _handleDeleteUser() } />
		</div>
	);
}

export default Account;
