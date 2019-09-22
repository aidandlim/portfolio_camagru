import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ui_nav } from '../../../actions';

import { FiUser, FiXCircle } from 'react-icons/fi';

import './index.css';

function Header() {
	const ui = useSelector(state => state.ui);
	const dispatch = useDispatch();

	return (
		<div className='header'>
			<div className='header-title' onClick={() => window.location.reload()}>#Camagru</div>
			{ ui.nav === 1 ? <FiXCircle className='header-icon' onClick={() => dispatch(ui_nav(0))}/> : <FiUser className='header-icon' onClick={() => dispatch(ui_nav(1))}/> }
		</div>
	);
}

export default Header;
