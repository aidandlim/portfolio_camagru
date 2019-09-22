import React from 'react';
import { useDispatch } from 'react-redux';
import { auth_isaccount } from '../../../actions';

import './index.css';

function Account() {
	const dispatch = useDispatch();

	return (
		<div className='account'>
			<input className='profile-logout' type='button' value='Back to User Information' onClick={ () => dispatch(auth_isaccount()) } />
		</div>
	);
}

export default Account;
