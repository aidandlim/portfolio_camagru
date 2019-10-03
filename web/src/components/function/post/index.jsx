import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ui_isload, content_id } from '../../../actions';

import axios from 'axios';
import { URL } from '../../../const';

import { confirmAlert } from 'react-confirm-alert';

import { FiHeart, FiMoreVertical } from 'react-icons/fi';
import './index.css';

function Post(props) {
	const auth = useSelector(state => state.auth);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	function _handleTextareaSize() {
		const e = document.getElementById('post-comment-box-' + props.data.id);
		e.style.height = '5px';
		e.style.height = 'calc(' + (e.scrollHeight) + 'px - 1rem)';
	}

	function _handleForm() {
		if(auth.token === '') {
			confirmAlert({
				message: 'This feature needs to be signed in first',
				buttons: [
					{
						label: 'Okay'
					}
				]
			});
			return;
		}
		dispatch(ui_isload());
		axios.post(URL + 'api/comment/insert', {
			token: auth.token,
			user_id: user.id,
			post_id: props.data.id,
			content: document.getElementById('post-comment-box-' + props.data.id).value,
		})
		.then(res => {
			if(res.data) {
				document.getElementById('post-comment-box-' + props.data.id).value = '';
			} else {
				confirmAlert({
					message: 'It seems like email or password information is wrong',
					buttons: [
						{
							label: 'Okay'
						}
					]
				});
			}
		})
		.then(() => {
			setTimeout(() => {
				dispatch(ui_isload());
			}, 500);
		});
	}

	return (
		<div className='post'>
			<div className='post-profile'></div>
			<div className='post-info-container'>
				<div className='post-author'>{props.data.user_nickname}</div>
				<div className='post-time'>{props.data.post_time}</div>
				{props.data.location !== '' ? <div className='post-in'>In</div> : ''}
				{props.data.location !== '' ? <div className='post-location'>{props.data.location}</div> : ''}
				{props.data.together !== '' ? <div className='post-with'>With</div> : ''}
				{props.data.together !== '' ? <div className='post-people'>{props.data.together}</div> : ''}
				{props.data.location === '' && props.data.together === '' ? <div className='post-in'>By Camagru App</div> : '' }
			</div>
			<div className='post-picture'></div>
			<div className='post-reflect-container'>
				<FiHeart className='post-icon' />
				<FiMoreVertical className='post-icon' />
				<textarea className='post-content' style={{height: props.data.content.split('\n').length + 'rem'}} value={props.data.content} readOnly></textarea>
				<div className='post-likes' onClick={ () => dispatch(content_id(props.id)) }>{props.data.num_likes} likes</div>
				<div className='post-comments' onClick={ () => dispatch(content_id(props.id)) }>View all {props.data.num_comments} comments</div>
				<textarea className='post-comment-box' id={'post-comment-box-' + props.data.id} name='content' placeholder='Add a comment...' onChange={ () => _handleTextareaSize() }></textarea>
				<div className='post-comment-post' onClick={ () => _handleForm() }>POST</div>
			</div>
		</div>
	);
}

export default Post;

