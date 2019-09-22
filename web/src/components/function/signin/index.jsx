import React from 'react';
import { useDispatch } from 'react-redux';
import { auth_id, auth_isregister, auth_isforgot } from '../../../actions';

import FacebookLogin from 'react-facebook-login';

import './index.css';

function Signin() {
	const dispatch = useDispatch();

	function _handleForm() {
		dispatch(auth_id('dlim'));
	}
	
	function _handleFacebookSignin(res) {
		console.log(res);
	}

	return (
		<div className='signin'>
			<div className='signin-title'>Sign in!</div>
			<form action='#' onSubmit={() => _handleForm()}>
				<input className='signin-input' type='email' placeholder='Email Address' required />
				<input className='signin-input' type='password' placeholder='Password' required />
				<button className='signin-btn' type='submit'>Sign in</button>
			</form>
			<div className='signin-or'>OR</div>
			<FacebookLogin
				cssClass='signin-facebook-btn'
				appId='304184623413563'
				fields='name,email,picture'
				callback={(res) => _handleFacebookSignin(res)}
				icon='fa-facebook-square'
				textButton=' Sign in with Facebook'
			/>
			<p onClick={() => dispatch(auth_isforgot())}><span>Forgot password?</span></p>
			<p>Don't have an account? <span onClick={() => dispatch(auth_isregister())}>Sign up!</span></p>
		</div>
	);
}

export default Signin;
