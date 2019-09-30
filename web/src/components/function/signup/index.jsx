import React from 'react';
import { useDispatch } from 'react-redux';
import { auth_isregister } from '../../../actions';

import axios from 'axios';
import { URL } from '../../../const';

import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

import { confirmAlert } from 'react-confirm-alert';

function Signup() {
	const dispatch = useDispatch();

	function _handleForm(e) {
		e.preventDefault();
		if(document.signup.password.value === document.signup.confirm.value) {
			axios.post(URL + 'api/user/signup', {
				email: document.signup.email.value,
				password: document.signup.password.value,
				nickname: document.signup.nickname.value,
			})
			.then(res => {
				if(res.data) {
					dispatch(auth_isregister());
				} else {
					confirmAlert({
						message: 'Email has to be unique',
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
				title: 'Password are not matched',
				message: 'Try again',
				buttons: [
					{
						label: 'Okay'
					}
				]
			});
		}
	}
	
	function _handleFacebookSignup(res) {
		console.log(res);
	}

	function _handleGoogleSignup(res) {
		console.log(res);
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
			<div className='signin-or'>OR</div>
			<FacebookLogin
				cssClass='signin-facebook-btn'
				appId='304184623413563'
				fields='name,email,picture'
				callback={(res) => _handleFacebookSignup(res)}
				textButton='Sign up with Facebook'
			/>
			<GoogleLogin
				clientId='572337747213-el3eomejo8fi035ge0tj2n4vff9qbvcl.apps.googleusercontent.com'
				onSuccess={(res) => _handleGoogleSignup(res)}
				onFailure={(res) => _handleGoogleSignup(res)}
				icon={false}
				buttonText='Sign in with Google'
				render={renderProps => (
					<button className='signin-google-btn' onClick={renderProps.onClick}>Sign in with Google</button>
				)}
			/>
			<p>Do you have an account? <span onClick={() => dispatch(auth_isregister())}>Sign in!</span></p>
		</div>
	);
}

export default Signup;
