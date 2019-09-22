import React from 'react';
import { useDispatch } from 'react-redux';
import { auth_isregister } from '../../../actions';

import FacebookLogin from 'react-facebook-login';

function Signup() {
	const dispatch = useDispatch();

	function _handleForm() {
		
	}
	
	function _handleFacebookSignup(res) {
		console.log(res);
	}

	return (
		<div className='signin'>
			<div className='signin-title'>Sign up!</div>
			<form action='#' onSubmit={() => _handleForm()}>
				<input className='signin-input' type='email' placeholder='Email Address' required />
				<input className='signin-input' type='password' placeholder='Password' required />
				<input className='signin-input' type='password' placeholder='Confirm Password' required />
				<input className='signin-input' type='text' placeholder='Nickname' required />
				<button className='signin-btn' type='submit'>Sign up</button>
			</form>
			<div className='signin-or'>OR</div>
			<FacebookLogin
				cssClass='signin-facebook-btn'
				appId='304184623413563'
				fields='name,email,picture'
				callback={(res) => _handleFacebookSignup(res)}
				icon='fa-facebook-square'
				textButton=' Sign up with Facebook'
			/>
			<p>Do you have an account? <span onClick={() => dispatch(auth_isregister())}>Sign in!</span></p>
		</div>
	);
}

export default Signup;
