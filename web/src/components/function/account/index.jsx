import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auth_isaccount, account_isprivate, account_isnotificate } from '../../../actions';

import './index.css';

function Account() {
	const account = useSelector(state => state.account);
	const dispatch = useDispatch();

	return (
		<div className='account'>
			<span className='account-title'>Private Account</span>
			{ account.isPrivate 
				? 
					<div className='account-toggle' onClick={() => dispatch(account_isprivate())}>
						<div className='account-toggle-box-active'></div>
						<div className='account-toggle-button-active'></div>
					</div>
				:
					<div className='account-toggle' onClick={() => dispatch(account_isprivate())}>
						<div className='account-toggle-box-inactive'></div>
						<div className='account-toggle-button-inactive'></div>
					</div>
			}
			<span className='account-title'>Send Notification</span>
			{ account.isNotificate 
				? 
					<div className='account-toggle' onClick={() => dispatch(account_isnotificate())}>
						<div className='account-toggle-box-active'></div>
						<div className='account-toggle-button-active'></div>
					</div>
				:
					<div className='account-toggle' onClick={() => dispatch(account_isnotificate())}>
						<div className='account-toggle-box-inactive'></div>
						<div className='account-toggle-button-inactive'></div>
					</div>
			}
			<div className='signin-margin'></div>
			<input className='profile-logout' type='button' value='Back to User Information' onClick={ () => dispatch(auth_isaccount()) } />
			<input className='profile-delete' type='button' value='Delete Account' />
		</div>
	);
}

export default Account;
