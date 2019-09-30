import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth_token, auth_isaccount, user_id, user_email, user_nickname, user_bio, user_isprivate, user_isnotificate, user_pic } from '../../../actions';

import axios from 'axios';
import { URL } from '../../../const';

import { confirmAlert } from 'react-confirm-alert';

import './index.css';

function Account() {
	const auth = useSelector(state => state.auth);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	function _handleIsPrivate() {
		axios.post(URL + 'api/user/updatePrivate', {
			token: auth.token,
			id: user.id,
		})
		.then(res => {
			if(res.data) {
				dispatch(user_isprivate(!user.isPrivate));
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
		axios.post(URL + 'api/user/updateNotificate', {
			token: auth.token,
			id: user.id,
		})
		.then(res => {
			if(res.data) {
				dispatch(user_isnotificate(!user.isNotificate));
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

	function _confirmDelete() {
		confirmAlert({
			message: 'Are you sure to delete your account?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => _deleteUser()
				},
				{
					label: 'No, Thanks'
				}
			]
		});
	}

	function _deleteUser() {
		if(window.confirm('Are you sure?')) {
			axios.post(URL + 'api/user/delete', {
				id: user.id,
			})
			.then(res => {
				if(res.data) {
					dispatch(auth_token(''));
					dispatch(user_id(-1));
					dispatch(user_email(''));
					dispatch(user_nickname(''));
					dispatch(user_bio(''));
					dispatch(user_isprivate(false));
					dispatch(user_isnotificate(false));
					dispatch(user_pic(undefined));
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
			{ user.isPrivate 
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
			{ user.isNotificate 
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
			<input className='profile-delete' type='button' value='Delete Account' onClick={ () => _confirmDelete() } />
		</div>
	);
}

export default Account;
