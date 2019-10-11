import React from 'react';

import { useDispatch } from 'react-redux';
import { auth_token, auth_isregister, auth_isforgot, user_user, user_biotemp } from '../../../actions';

import axios from 'axios';
import cookie from 'react-cookies';

import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';

import { confirmAlert } from 'react-confirm-alert';
import './index.css';

const Signin = () => {
	const dispatch = useDispatch();

	const _handleForm = (e) => {
		e.preventDefault();
		axios.post('/auth/signin', {
			email: document.signin.email.value,
			password: document.signin.password.value
		})
		.then(res => {
			if(res.data.token !== null) {
				if(res.data.status) {
					dispatch(auth_token(res.data.token));
					cookie.save('token', res.data.token, { path: '/' });
					_handleData(res.data.token);
				} else {
					confirmAlert({
						message: 'This account has not verified by email. Do you want to get verifying email again?',
						buttons: [
							{
								label: 'Yes',
								onClick: () => _handleVerifyingEmail()
							},
							{
								label: 'No, Thanks'
							}
						]
					});
				}
			} else {
				confirmAlert({
					message: 'It seems like email or password information is wrong',
					buttons: [
						{
							label: 'Okay'
						}
					]
				});
			}
		});
	}

	const _handleData = (token) => {
		axios.post('/user/select', {
			token: token
		})
		.then(res => {
			if(res.data !== null) {
				dispatch(user_user(res.data));
				dispatch(user_biotemp(res.data.bio === null ? '' : res.data.bio));
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
		});
	}

	const _handleVerifyingEmail = () => {
		axios.post('/auth/verifyAgain', {
			email: document.signin.email.value
		});
	}
	
	const _handleFacebookSignin = (res) => {
		console.log(res);
	}

	const _handleGoogleSignin = (res) => {
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
