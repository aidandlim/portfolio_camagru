import React from 'react';
import { useSelector } from 'react-redux';

import Auth from '../../function/auth';
import Profile from '../../function/profile';
import Account from '../../function/account';

import './index.css';

function Sidebar() {
	const auth = useSelector(state => state.auth);
	
	return (
		<div className='sidebar'>
			{ auth.id === '' ? <Auth /> : (auth.isAccount ? <Account /> : <Profile />) }
		</div>
	);
}

export default Sidebar;
