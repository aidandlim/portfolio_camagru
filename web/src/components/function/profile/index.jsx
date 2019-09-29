import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth_token, auth_isaccount, user_id, user_email, user_nickname, user_bio, user_isprivate, user_isnotificate, user_pic } from '../../../actions';

import axios from 'axios';
import { URL } from '../../../const';

import default_user from '../../../resources/default_user.jpg';
import './index.css';

function Profile() {
	const auth = useSelector(state => state.auth);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	function _handleForm(e) {
		e.preventDefault();
		axios.post(URL + 'api/user/update', {
			token: auth.token,
			id: user.id,
			email: document.changeProfile.email.value,
			nickname: document.changeProfile.nickname.value,
			bio: document.changeProfile.bio.value,
		})
		.then(res => {
			if(res.data) {
				_handleData(auth.token);
				alert('Success');
			} else {
				alert('Fail');
			}
		});
	}

	function _handleChangePassword(e) {
		e.preventDefault();
		if(document.changePassword.change.value === document.changePassword.confirm.value) {
			axios.post(URL + 'api/user/updatePassword', {
				token: auth.token,
				email: user.email,
				password: document.changePassword.current.value,
				change: document.changePassword.change.value,
			})
			.then(res => {
				if(res.data) {
					document.changePassword.current.value = '';
					document.changePassword.change.value = '';
					document.changePassword.confirm.value = '';
					alert('Success');
				} else {
					alert('Fail');
				}
			});
		} else {
			alert('Password is not matched');
		}
	}

	function _handleData(token) {
		axios.post(URL + 'api/user/select', {
			token: token
		})
		.then(res => {
			if(res.data !== null) {
				dispatch(user_id(res.data.id));
				dispatch(user_email(res.data.email));
				dispatch(user_nickname(res.data.nickname));	
				dispatch(user_bio(res.data.bio));
			} else {
				alert('Fail!');
			}
		});
	}

	function _logout() {
		dispatch(auth_token(''));
		dispatch(user_id(-1));
		dispatch(user_email(''));
		dispatch(user_nickname(''));
		dispatch(user_bio(''));
		dispatch(user_isprivate(false));
		dispatch(user_isnotificate(false));
		dispatch(user_pic(null));
	}

	return (
		<div className='profile'>
			<div className='profile-profile'
				style={
					user.pic === null
					?
					{ backgroundImage: 'url(\'' + default_user + '\')' }
					:
					{ backgroundImage: 'url(\'' + user.pic + '\')' }
				}
			></div>
			<div className='profile-change-profile'>Change Profile Picture</div>
			<form name='changeProfile' onSubmit={_handleForm}>
				<span className='profile-placeholder'>Nickname</span>
				<input className='profile-input' type='text' name='nickname' required defaultValue={user.nickname} />
				<span className='profile-placeholder'>Email</span>
				<input className='profile-input' type='email' name='email' required defaultValue={user.email} />
				<span className='profile-placeholder'>Bio</span>
				<input className='profile-input' name='bio' defaultValue={user.bio} />
				<input className='profile-submit' type='submit' value='Update User Information' />
			</form>
			<form name='changePassword' onSubmit={_handleChangePassword}>
				<span className='profile-placeholder'>Current Password</span>
				<input className='profile-input' name='current' type='password' required />
				<span className='profile-placeholder'>Change Password</span>
				<input className='profile-input' name='change' type='password' required />
				<span className='profile-placeholder'>Confirm Password</span>
				<input className='profile-input' name='confirm' type='password' required />
				<input className='profile-submit' type='submit' value='Update User Password' />
				<input className='profile-logout' type='button' value='Go to Account Setting' onClick={ () => dispatch(auth_isaccount()) } />
				<input className='profile-logout' type='button' value='Logout' onClick={ () => _logout() }/>
			</form>
		</div>
	);
}

export default Profile;
