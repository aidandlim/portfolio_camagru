import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ui_isload, content_post, content_post_likes, content_post_comments } from '../../../actions';

import axios from 'axios';
import { URL } from '../../../const';

import default_user from '../../../resources/default_user.jpg';
import './index.css';

function Message(props) {
	const auth = useSelector(state => state.auth);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	
	function _handleDetail(id) {
		dispatch(ui_isload());
		axios.post(URL + 'api/post/select', {
			token: auth.token,
			id: id,
			user_id: user.id,
		})
		.then(res => {
			dispatch(content_post(res.data));
			_handleDetailLikesAndComments(id);
		})
		.then(() => {
			setTimeout(() => {
				dispatch(ui_isload());
			}, 500);
		});
	}

	function _handleDetailLikesAndComments(id) {
		axios.post(URL + 'api/reflection/selectAllByPost', {
			id: id,
		})
		.then(res => {
			dispatch(content_post_likes(res.data));
		});
		axios.post(URL + 'api/comment/selectAllByPost', {
			id: id,
		})
		.then(res => {
			dispatch(content_post_comments(res.data));
		});
	}

	return (
		<div className='message' onClick={() => _handleDetail(props.content.post_id)}>
			<div className='message-profile' style={
				props.content.user_picture === null
				?
				{ backgroundImage: 'url(\'' + default_user + '\')' }
				:
				{ backgroundImage: 'url(\'data:image/jpeg;base64, ' + props.content.user_picture + '\')' }
			}></div>
			<div className='message-author'>{props.content.user_nickname}</div>
			<div className='message-content'>{props.content.type === 'likes' ? 'liked your post!' : 'commented your post!'}</div>
			<div className='message-time'>{props.content.time}</div>
		</div>
	);
}

export default Message;
