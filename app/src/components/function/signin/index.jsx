import React from 'react';

import { useDispatch } from 'react-redux';
import { auth_token, auth_isregister, auth_isforgot, user_user, user_biotemp, post_posts, post_isdone } from '../../../actions';

import axios from 'axios';
import cookie from 'react-cookies';

import { confirmAlert } from 'react-confirm-alert';
import './index.css';

const Signin = () => {
	const dispatch = useDispatch();

	const _handleForm = (e) => {
		e.preventDefault();
		axios.post('/auth/signin', {
			email: document.signin.email.value,
			password: document.signin.password.value
		})
		.then(res => {
			if(res.data.status === 1) {
				dispatch(auth_token(res.data.token));
				cookie.save('token', res.data.token, { path: '/' });
				dispatch(post_posts([]));
				dispatch(post_isdone(false));
				_handleData(res.data.token);
			} else if(res.data.status === 0) {
				confirmAlert({
					message: 'This account has not verified by email!',
					buttons: [
						{
							label: 'Request resend email',
							onClick: () => _handleVerifyingEmail()
						},
						{
							label: 'Okay'
						}
					]
				});
			} else if(res.data.status === -1) {
				confirmAlert({
					message: 'Email or password information is wrong!',
					buttons: [
						{
							label: 'Okay'
						}
					]
				});
			}
		});
	}

	const _handleData = (token) => {
		axios.post('/user/select', {
			token: token
		})
		.then(res => {
			if(res.data !== null) {
				dispatch(user_user(res.data));
				dispatch(user_biotemp(res.data.bio === null ? '' : res.data.bio));
			}
		});
	}

	const _handleVerifyingEmail = () => {
		axios.post('/auth/verifyAgain', {
			email: document.signin.email.value
		});
	}

	return (
		<div className='signin'>
			<div className='signin-title'>Sign in!</div>
			<form name='signin' onSubmit={_handleForm} autoComplete='off'>
				<input className='signin-input' type='email' name='email' placeholder='Email Address' required />
				<input className='signin-input' type='password' name='password' placeholder='Password' required />
				<button className='signin-btn' type='submit'>Sign in</button>
			</form>
			<p onClick={() => dispatch(auth_isforgot())}><span>Forgot password?</span></p>
			<p>Don't have an account? <span onClick={() => dispatch(auth_isregister())}>Sign up!</span></p>
		</div>
	);
}

export default Signin;

