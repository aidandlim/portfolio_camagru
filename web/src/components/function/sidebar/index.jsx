import React from 'react';
import { useSelector } from 'react-redux';

import Auth from '../../function/auth';
import Profile from '../../function/profile';
import Account from '../../function/account';

import './index.css';

const Sidebar = () => {
	const auth = useSelector(state => state.auth);
	
	return (
		<div className='sidebar'>
			{ auth.token === '' ? <Auth /> : (auth.isAccount ? <Account /> : <Profile />) }
		</div>
	);
}

export default Sidebar;
