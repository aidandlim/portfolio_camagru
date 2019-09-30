import React from 'react';
import { useDispatch } from 'react-redux';
import { ui_isload, auth_isforgot } from '../../../actions';

import axios from 'axios';
import { URL } from '../../../const';

import { confirmAlert } from 'react-confirm-alert';

function Forgot() {
	const dispatch = useDispatch();

	function _handleForm(e) {
		e.preventDefault();
		dispatch(ui_isload());
		axios.post(URL + 'api/user/forgot', {
			email: document.forgot.email.value,
		})
		.then(res => {
			if(res.data) {
				dispatch(auth_isforgot());
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
