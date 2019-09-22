import React from 'react';
import { useDispatch } from 'react-redux';
import { auth_id, auth_isaccount } from '../../../actions';

import './index.css';

function Profile() {
	const dispatch = useDispatch();

	return (
		<div className='profile'>
			<div className='profile-profile'></div>
			<div className='profile-change-profile'>Change Profile Picture</div>
			<form>
				<span className='profile-placeholder'>Nickname</span>
				<input className='profile-input' type='text' required />
				<span className='profile-placeholder'>Current Password</span>
				<input className='profile-input' type='text' />
				<span className='profile-placeholder'>Change Password</span>
				<input className='profile-input' type='password' />
				<span className='profile-placeholder'>Confirm Password</span>
				<input className='profile-input' type='password' />
				<span className='profile-placeholder'>Email</span>
				<input className='profile-input' type='email' required />
				<span className='profile-placeholder'>Bio</span>
				<div className='profile-textbox' contentEditable='true'></div>
				<input className='profile-submit' type='submit' value='Update User Information' />
				<input className='profile-logout' type='button' value='Go to Account Setting' onClick={ () => dispatch(auth_isaccount()) } />
				<input className='profile-logout' type='button' value='Logout' onClick={ () => dispatch(auth_id('')) } />
				{/* <input className='profile-delete' type='button' value='Delete User Information' /> */}
			</form>
		</div>
	);
}

export default Profile;
