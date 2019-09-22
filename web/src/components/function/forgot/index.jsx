import React from 'react';
import { useDispatch } from 'react-redux';
import { auth_isforgot } from '../../../actions';

function Forgot() {
	const dispatch = useDispatch();

	function _handleForm() {
		
	}

	return (
		<div className='signin'>
			<div className='signin-title'>Forgot your password?</div>
			<form action='#' onSubmit={() => _handleForm()}>
				<input className='signin-input' type='email' placeholder='Email Address' required />
				<button className='signin-btn' type='submit'>Find your password</button>
			</form>
			<div className='signin-margin'></div>
			<p>Do you remember your password? <span onClick={() => dispatch(auth_isforgot())}>Sign in!</span></p>
		</div>
	);
}

export default Forgot;
