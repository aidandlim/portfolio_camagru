import React from 'react';
import { useSelector } from 'react-redux';

import Search from '../../function/search';
import Camera from '../../function/camera';
import Notification from '../../function/notification';
import Post from '../../function/post';
import Detail from '../../function/detail';

import './index.css';

function Body() {
	const ui = useSelector(state => state.ui);
	const content = useSelector(state => state.content);

	return (
		<div className='body'>
			{ ui.nav === 2 ? <Search /> : '' }
			{ ui.nav === 3 ? <Camera /> : '' }
			{ ui.nav === 4 ? <Notification /> : '' }
			<div className='inner-container'>
				{ content.id !== -1 ? <Detail id={content.id} /> : '' }
				{ content.id === -1 ? <Post id={0} /> : '' }
				{ content.id === -1 ? <Post id={1} /> : '' }
				{ content.id === -1 ? <Post id={2} /> : '' }
			</div>
		</div>
	);
}

export default Body;
