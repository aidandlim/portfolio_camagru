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
				<label className='profile-placeholder'>Nickname</label>
				<input className='profile-input' type='text' required />
				<label className='profile-placeholder'>Current Password</label>
				<input className='profile-input' type='text' />
				<label className='profile-placeholder'>Change Password</label>
				<input className='profile-input' type='password' />
				<label className='profile-placeholder'>Confirm Password</label>
				<input className='profile-input' type='password' />
				<label className='profile-placeholder'>Email</label>
				<input className='profile-input' type='email' required />
				<label className='profile-placeholder'>Bio</label>
				<div className='profile-textbox' contentEditable='true'></div>
				<input className='profile-submit' type='submit' value='Update User Information' />
				<input className='profile-detail' type='button' value='Go to Account Setting' onClick={ () => dispatch(auth_isaccount()) } />
				<input className='profile-logout' type='button' value='Logout' onClick={ () => dispatch(auth_id('')) } />
				{/* <input className='profile-delete' type='button' value='Delete User Information' /> */}
			</form>
		</div>
	);
}

export default Profile;
