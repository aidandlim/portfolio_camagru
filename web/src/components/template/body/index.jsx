import React from 'react';
import { useSelector } from 'react-redux';

import Search from '../../function/search';
import Camera from '../../function/camera';
import Notification from '../../function/notification';
import Post from '../../function/post';

import './index.css';

function Body() {
	const ui = useSelector(state => state.ui);

	return (
		<div className='body'>
			{ ui.nav === 2 ? <Search /> : '' }
			{ ui.nav === 3 ? <Camera /> : '' }
			{ ui.nav === 4 ? <Notification /> : '' }
			<div className='inner-container'>
				<Post />
				<Post />
				<Post />
			</div>
		</div>
	);
}

export default Body;
