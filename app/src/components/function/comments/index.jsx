import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ui_nav, auth_token, user_user, user_biotemp, content_post, search_user } from '../../../actions';

import axios from 'axios';
import cookie from 'react-cookies';

import { confirmAlert } from 'react-confirm-alert';
import default_user from '../../../resources/default_user.png';
import './index.css';

const Comments = (props) => {
	const auth = useSelector(state => state.auth);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const _handleProfilePage = () => {
		axios.post('/search/select', {
			id: props.comment.user_id
		})
		.then(res => {
			if(res.data !== null) {
				dispatch(search_user(res.data));
				dispatch(ui_nav(5));
			}
		});
	}

	const _handleCommentsDelete = (id) => {
		if(props.comment.user_id === user.user.id) {
			confirmAlert({
				message: 'Are you sure to delete your post?',
				buttons: [
					{
						label: 'Yes',
						onClick: () => _processDeleteComment(id)
					},
					{
						label: 'No'
					}
				]
			});
		} else {
			confirmAlert({
				message: 'This feature is only available to owner',
				buttons: [
					{
						label: 'Okay'
					}
				]
			});
		}
	}

	const _processDeleteComment = (id) => {
		if(auth.token === '') {
			confirmAlert({
				message: 'This feature needs to be signed in first!',
				buttons: [
					{
						label: 'Okay'
					}
				]
			});
			return;
		}
		axios.post('/comment/delete', {
			token: auth.token,
			id: id
		})
		.then(res => {
			if(res.data) {
				_handleDetail();
			} else {
				cookie.remove('token', { path: '/'});

				dispatch(auth_token(''));
				dispatch(user_user({}));
				dispatch(user_biotemp(''));
				dispatch(ui_nav(0));

				confirmAlert({
					message: 'The session is no longer valid!',
					buttons: [
						{
							label: 'Okay'
						}
					]
				});
			}
		});
	}

	const _handleDetail = () => {
		axios.post('/post/select', {
			token: auth.token,
			id: props.postId,
			user_id: user.user.id,
		})
		.then(res => {
			dispatch(content_post(res.data));
			dispatch(ui_nav(6));
		})
	}

	return (
		<div className='comments'>
			<div className='comments-container'>
				<div className='comments-profile' style={
					props.comment.user_picture === null
					?
					{ backgroundImage: 'url(\'' + default_user + '\')' }
					:
					{ backgroundImage: 'url(\'/picture?p=' + props.comment.user_picture + '\')' }
				} onClick={() => _handleProfilePage()}></div>
				<textarea className='comments-content' style={{height: props.comment.content.split('\n').length + 'rem'}} value={props.comment.content} readOnly></textarea>
				<div className='comment-nickname'>BY {props.comment.user_nickname} ({props.comment.time})</div>
				{ props.comment.user_id === user.user.id ? <div className='comment-delete' onClick={() => _handleCommentsDelete(props.comment.id)}>DELETE</div> : <div className='comment-delete'></div> }
			</div>
		</div>
	);
}

export default Comments;

