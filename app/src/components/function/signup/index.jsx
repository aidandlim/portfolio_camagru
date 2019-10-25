import React from 'react';

import { useDispatch } from 'react-redux';
import { auth_isregister } from '../../../actions';

import axios from 'axios';

import { confirmAlert } from 'react-confirm-alert';

const Signup = () => {
	const dispatch = useDispatch();

	const _handleForm = (e) => {
		e.preventDefault();
		if(_handlePasswordCheck() !== 0) {
			confirmAlert({
				message: 'Passwords is not valid!',
				buttons: [
					{
						label: 'Okay'
					}
				]
			});
		} else {
			const email = document.signup.email.value;
			const password = document.signup.password.value;
			const nickname = document.signup.nickname.value;
			dispatch(auth_isregister());
			axios.post('/auth/signup', {
				email: email,
				password: password,
				nickname: nickname,
			})
			.then(res => {
				if(res.data) {
					confirmAlert({
						message: 'Check your email, please!',
						buttons: [
							{
								label: 'Okay'
							}
						]
					});	
				} else {
					confirmAlert({
						message: 'This email is already registered!',
						buttons: [
							{
								label: 'Okay'
							}
						]
					});
					dispatch(auth_isregister());
				}
			});
		}
	}

	const _handlePasswordCheck = () => {
		const password = document.signup.password.value;
		const confirm = document.signup.confirm.value;

		const pattern1 = /[0-9]/;
        const pattern2 = /[a-zA-Z]/;
		const pattern3 = /[~!@#$%<>^&*]/;

		document.getElementById('signin-password-check-1').style.color = '#00796B';
		document.getElementById('signin-password-check-2').style.color = '#00796B';
		document.getElementById('signin-password-check-3').style.color = '#00796B';

		let error = 0;
		
		if(!(8 <= password.length && password.length <= 20)) {
			document.getElementById('signin-password-check-1').style.color = '#D32F2F';
			error++;
		}

		if(!pattern1.test(password) || !pattern2.test(password) || !pattern3.test(password)) {
			document.getElementById('signin-password-check-2').style.color = '#D32F2F';
			error++;
		}

		if(password === '' || password !== confirm) {
			document.getElementById('signin-password-check-3').style.color = '#D32F2F';
			error++;
		}

		return error;
	}

	return (
		<div className='signin'>
			<div className='signin-title'>Sign up!</div>
			<form name='signup' onSubmit={_handleForm} autoComplete='off'>
				<input className='signin-input' type='email' name='email' placeholder='Email Address' required />
				<input className='signin-input' type='password' name='password' placeholder='Password' onChange={ () => _handlePasswordCheck() } required />
				<input className='signin-input' type='password' name='confirm' placeholder='Confirm Password' onChange={ () => _handlePasswordCheck() } required />
				<div id='signin-password-checker' className='signup-password-check'>
					<p id='signin-password-check-1'>- Password has to be within 8 ~ 20 characters.</p>
					<p id='signin-password-check-2'>- Also, it has to include upper case and special characters.</p>
					<p id='signin-password-check-3'>- And then, pleas confirm your password.</p>
				</div>
				<input className='signin-input' type='text' name='nickname' placeholder='Nickname' required />
				<button className='signin-btn' type='submit'>Sign up</button>
			</form>
			<p>Do you have an account? <span onClick={() => dispatch(auth_isregister())}>Sign in!</span></p>
		</div>
	);
}

export default Signup;
