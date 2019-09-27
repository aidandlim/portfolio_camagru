import React from 'react';
import { useDispatch } from 'react-redux';
import { auth_token, auth_isregister, auth_isforgot } from '../../../actions';

import axios from 'axios';
import { URL } from '../../../const';

import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

import './index.css';

function Signin() {
	const dispatch = useDispatch();

	function _handleForm(e) {
		e.preventDefault();
		axios.post(URL + 'api/user/signin', {
			email: document.signin.email.value,
			password: document.signin.password.value
		})
		.then(res => {
			console.log(res);
			if(res.data.token !== null) {
				dispatch(auth_token(res.data.token));
			} else {
				alert('Fail!');
			}
		});
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
			<form name='signin' onSubmit={_handleForm}>
				<input className='signin-input' type='email' name='email' placeholder='Email Address' required />
				<input className='signin-input' type='password' name='password' placeholder='Password' required />
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
