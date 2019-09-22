import React from 'react';
import { useSelector } from 'react-redux';

import Signin from '../signin';
import Signup from '../signup';
import Forgot from '../forgot';

import './index.css';

function Auth() {
	const auth = useSelector(state => state.auth);
	return (
		<div className='auth'>
			{ auth.isRegister ? <Signup /> : ( auth.isForgotPassword ? <Forgot /> : <Signin /> ) }
		</div>
	);
}

export default Auth;
