import React from 'react';

import { useDispatch } from 'react-redux';
import { auth_isregister } from '../../../actions';

import axios from 'axios';

import { confirmAlert } from 'react-confirm-alert';

const Signup = () => {
	const dispatch = useDispatch();

	const _handleForm = (e) => {
		e.preventDefault();
		if(document.signup.password.value === document.signup.confirm.value) {
			axios.post('/auth/signup', {
				email: document.signup.email.value,
				password: document.signup.password.value,
				nickname: document.signup.nickname.value,
			})
			.then(res => {
				if(res.data) {
					dispatch(auth_isregister());
				} else {
					confirmAlert({
						message: 'This email is already registered!',
						buttons: [
							{
								label: 'Okay'
							}
						]
					});
				}
			});
		} else {
			confirmAlert({
				message: 'Passwords do not match!',
				buttons: [
					{
						label: 'Okay'
					}
				]
			});
		}
	}

	return (
		<div className='signin'>
			<div className='signin-title'>Sign up!</div>
			<form name='signup' onSubmit={_handleForm}>
				<input className='signin-input' type='email' name='email' placeholder='Email Address' required />
				<input className='signin-input' type='password' name='password' placeholder='Password' required />
				<input className='signin-input' type='password' name='confirm' placeholder='Confirm Password' required />
				<input className='signin-input' type='text' name='nickname' placeholder='Nickname' required />
				<button className='signin-btn' type='submit'>Sign up</button>
			</form>
			<p>Do you have an account? <span onClick={() => dispatch(auth_isregister())}>Sign in!</span></p>
		</div>
	);
}

export default Signup;
