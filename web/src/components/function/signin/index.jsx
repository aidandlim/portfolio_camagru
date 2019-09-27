import React from 'react';
import { useDispatch } from 'react-redux';
import { auth_id, auth_isregister, auth_isforgot } from '../../../actions';

import axios from 'axios';
import { URL } from '../../../const';

import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

import './index.css';

function Signin() {
	const dispatch = useDispatch();

	function _handleForm(e) {
		// if(document.signup.password.value === document.signup.confirm.value) {
		// 	axios.post(URL + 'api/user/signup', {
		// 		email: document.signup.email.value,
		// 		password: document.signup.password.value,
		// 		nickname: document.signup.nickname.value,
		// 	})
		// 	.then(res => {
		// 		if(res.data) {
		// 			dispatch(auth_isregister());
		// 		} else {
		// 			alert('Fail!');
		// 		}
		// 	});
		// } else {
		// 	alert('Password is not matched');
		// }
		e.preventDefault();
	}
	
	function _handleFacebookSignin(res) {
		console.log(res);
	}

	function _handleGoogleSignin(res) {
		console.log(res);
	}

	return (
		<div className='signin'>
			<div className='signin-title'>Sign in!</div>
			<form name='signin' onSubmit={() => _handleForm()}>
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
				textButton='Sign in with Facebook'
			/>
			<GoogleLogin
				clientId='572337747213-el3eomejo8fi035ge0tj2n4vff9qbvcl.apps.googleusercontent.com'
				onSuccess={(res) => _handleGoogleSignin(res)}
				onFailure={(res) => _handleGoogleSignin(res)}
				icon={false}
				buttonText='Sign in with Google'
				render={renderProps => (
					<button className='signin-google-btn' onClick={renderProps.onClick}>Sign in with Google</button>
				)}
			/>
			<p onClick={() => dispatch(auth_isforgot())}><span>Forgot password?</span></p>
			<p>Don't have an account? <span onClick={() => dispatch(auth_isregister())}>Sign up!</span></p>
		</div>
	);
}

export default Signin;
