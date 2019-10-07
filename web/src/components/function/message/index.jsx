import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ui_nav, ui_isload, content_post, search_user } from '../../../actions';

import axios from 'axios';
import { URL } from '../../../const';

import { confirmAlert } from 'react-confirm-alert';
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
		})
		.then(() => {
			setTimeout(() => {
				dispatch(ui_isload());
			}, 500);
		});
	}

	function _handleProfilePage() {
		dispatch(ui_isload());
		axios.post(URL + 'api/search/select', {
			id: props.content.user_id
		})
		.then(res => {
			if(res.data !== null) {
				dispatch(search_user(res.data));
				dispatch(ui_nav(5));
			} else {
				confirmAlert({
					message: 'Something went wrong :(',
					buttons: [
						{
							label: 'I will try again'
						}
					]
				});
			}
		})
		.then(() => {
			dispatch(ui_isload());
		});
	}

	return (
		<div className='message'>
			<div className='message-profile' style={
				props.content.user_picture === null
				?
				{ backgroundImage: 'url(\'' + default_user + '\')' }
				:
				{ backgroundImage: 'url(\'data:image/jpeg;base64, ' + props.content.user_picture + '\')' }
			} onClick={() => _handleProfilePage()}></div>
			<div className='message-author' onClick={() => _handleDetail(props.content.post_id)}>{props.content.user_nickname}</div>
			<div className='message-content' onClick={() => _handleDetail(props.content.post_id)}>{props.content.type === 'likes' ? 'liked your post!' : 'commented your post!'}</div>
			<div className='message-time' onClick={() => _handleDetail(props.content.post_id)}>{props.content.time}</div>
		</div>
	);
}

export default Message;
