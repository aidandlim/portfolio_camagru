import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ui_nav, content_post, search_user } from '../../../actions';

import axios from 'axios';

import default_user from '../../../resources/default_user.png';
import './index.css';

const Message = (props) => {
	const auth = useSelector(state => state.auth);
	const dispatch = useDispatch();
	
	const _handleDetail = (id) => {
		axios.post('/post/select', {
			token: auth.token,
			id: id,
		})
		.then(res => {
			dispatch(content_post(res.data));
			dispatch(ui_nav(6));
		});
	}

	const _handleProfilePage = () => {
		axios.post('/search/select', {
			id: props.content.user_id
		})
		.then(res => {
			if(res.data !== null) {
				dispatch(search_user(res.data));
				dispatch(ui_nav(5));
			}
		});
	}

	return (
		<div className='message'>
			<div className='message-profile' style={
				props.content.user_picture === null
				?
				{ backgroundImage: 'url(\'' + default_user + '\')' }
				:
				{ backgroundImage: 'url(\'/picture?p=' + props.content.user_picture + '\')' }
			} onClick={() => _handleProfilePage()}></div>
			<div className='message-author' onClick={() => _handleDetail(props.content.post_id)}>{props.content.user_nickname}</div>
			<div className='message-content' onClick={() => _handleDetail(props.content.post_id)}>{props.content.type === 'likes' ? 'liked your post!' : 'commented your post!'}</div>
			<div className='message-time' onClick={() => _handleDetail(props.content.post_id)}>{props.content.time}</div>
		</div>
	);
}

export default Message;
