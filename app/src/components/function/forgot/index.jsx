import React from 'react';

import { useDispatch } from 'react-redux';
import { auth_isforgot } from '../../../actions';

import axios from 'axios';

import { confirmAlert } from 'react-confirm-alert';

const Forgot = () => {
	const dispatch = useDispatch();

	const _handleForm = (e) => {
		e.preventDefault();
		axios.post('/auth/forgot', {
			email: document.forgot.email.value,
		})
		.then(res => {
			if(res.data) {
				dispatch(auth_isforgot());
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
					message: 'This email does not exist!',
					buttons: [
						{
							label: 'I will try again'
						}
					]
				});
			}
		});
	}

	return (
		<div className='signin'>
			<div className='signin-title'>Forgot your password?</div>
			<form name='forgot' onSubmit={_handleForm}>
				<input className='signin-input' type='email' name='email' placeholder='Email Address' required />
				<button className='signin-btn' type='submit'>Find your password</button>
			</form>
			<div className='signin-margin'></div>
			<p>Do you remember your password? <span onClick={() => dispatch(auth_isforgot())}>Sign in!</span></p>
		</div>
	);
}

export default Forgot;
