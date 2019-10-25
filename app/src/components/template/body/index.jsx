import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { post_posts, post_isdone } from '../../../actions';

import axios from 'axios';

import Post from '../../function/post';
import Search from '../../function/search';
import Camera from '../../function/camera';
import Notification from '../../function/notification';
import Mypage from '../../function/mypage';
import Detail from '../../function/detail';

import './index.css';

const Body = () => {
	const ui = useSelector(state => state.ui);
	const auth = useSelector(state => state.auth);
	const content = useSelector(state => state.content);
	const dispatch = useDispatch();

	let post = useSelector(state => state.post);
	let isLoad = false;

	const _handleExploreScroll = (e) => {
		if(ui.nav === 0 && post.isDone === false && isLoad === false) {
			if(e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight) > 0.9) {
				isLoad = true;
				axios.post('/post/selectAll', {
					token: auth.token,
					call: parseInt(post.posts[post.posts.length - 1].id),
				})
				.then(res => {
					let posts = post.posts;
					if(res.data.length === 0) {
						dispatch(post_isdone(true));
					} else {
						dispatch(post_posts(posts.concat(res.data)));
					}
				})
				.then(() => {
					isLoad = false;
				});
			}
		}
	}

	return (
		<div className='body' onScroll={_handleExploreScroll}>
			{ ui.nav === 0 || ui.nav === 1 ? 
				<div className='inner-container'>
					{post.posts.map((post) => 
						<Post key={post.id} data={post} />
					)}
				</div>
			: '' }
			{ ui.nav === 2 ? <Search /> : '' }
			{ ui.nav === 3 ? <Camera /> : '' }
			{ ui.nav === 4 ? <Notification /> : '' }
			{ ui.nav === 5 ? <Mypage /> : '' }
			{ ui.nav === 6 ? <Detail id={content.id} /> : '' }
		</div>
	);
}

export default Body;
