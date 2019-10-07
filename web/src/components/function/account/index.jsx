import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ui_isload, auth_token, auth_isaccount, user_user } from '../../../actions';

import axios from 'axios';
import { URL } from '../../../const';

import { confirmAlert } from 'react-confirm-alert';

import './index.css';

function Account() {
	const auth = useSelector(state => state.auth);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	function _handleIsPrivate() {
		dispatch(ui_isload());
		axios.post(URL + 'api/user/updatePrivate', {
			token: auth.token,
			id: user.id,
		})
		.then(res => {
			if(res.data) {
				user.user.isPrivate = !user.user.isPrivate;
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
			setTimeout(() => {
				dispatch(ui_isload());
			}, 500);
		});
		
	}

	function _handleIsNotificate() {
		dispatch(ui_isload());
		axios.post(URL + 'api/user/updateNotificate', {
			token: auth.token,
			id: user.id,
		})
		.then(res => {
			if(res.data) {
				user.user.isNotificate = !user.user.isNotificate;
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
			setTimeout(() => {
				dispatch(ui_isload());
			}, 500);
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
		dispatch(ui_isload());
		if(window.confirm('Are you sure?')) {
			axios.post(URL + 'api/user/delete', {
				id: user.id,
			})
			.then(res => {
				if(res.data) {
					dispatch(auth_token(''));
					dispatch(user_user({}));
					dispatch(auth_isaccount(false));
					setTimeout(() => {
						dispatch(ui_isload());
					}, 500);
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
			{ user.user.isPrivate 
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
			{ user.user.isNotificate 
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
