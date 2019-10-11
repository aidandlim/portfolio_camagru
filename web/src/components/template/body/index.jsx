import React from 'react';

import { useSelector } from 'react-redux';

import Post from '../../function/post';
import Search from '../../function/search';
import Result from '../../function/result';
import Camera from '../../function/camera';
import Notification from '../../function/notification';
import Mypage from '../../function/mypage';
import Detail from '../../function/detail';

import './index.css';

const Body = () => {
	const ui = useSelector(state => state.ui);
	const content = useSelector(state => state.content);
	const post = useSelector(state => state.post);
	const search = useSelector(state => state.search);

	return (
		<div className='body'>
			{ ui.nav === 0 ? 
				<div className='inner-container'>
					{post.posts.map((post) => 
							<Post key={post.id} data={post} />
					)}
				</div>
			: '' }
			{ ui.nav === 2 && search.users.length === 0 && search.posts.length === 0 ? <Search /> : '' }
			{ ui.nav === 2 && (search.users.length !== 0 || search.posts.length !== 0) ? <Result /> : '' }
			{ ui.nav === 3 ? <Camera /> : '' }
			{ ui.nav === 4 ? <Notification /> : '' }
			{ ui.nav === 5 ? <Mypage /> : '' }
			{ ui.nav === 6 ? <Detail id={content.id} /> : '' }
		</div>
	);
}

export default Body;
