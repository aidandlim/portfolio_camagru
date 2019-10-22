import React from 'react';

import { useSelector } from 'react-redux';

import Signin from '../signin';
import Signup from '../signup';
import Forgot from '../forgot';

import './index.css';

const Auth = () => {
	const auth = useSelector(state => state.auth);
	
	return (
		<div className='auth'>
			{ auth.isRegister 
				? 
				<Signup /> 
				: 
				( auth.isForgot ? <Forgot /> : <Signin /> ) 
			}
		</div>
	);
}

export default Auth;
