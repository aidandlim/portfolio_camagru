import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ui_isload, content_post, content_post_likes, content_post_comments } from '../../../actions';

import axios from 'axios';
import { URL } from '../../../const';

import { confirmAlert } from 'react-confirm-alert';

import { FiHeart, FiMoreVertical } from 'react-icons/fi';
import { MdFavorite } from 'react-icons/md';
import default_user from '../../../resources/default_user.jpg';
import './index.css';

function Post(props) {
	const auth = useSelector(state => state.auth);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	function _handleLikes() {
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
		axios.post(URL + 'api/reflection/insert', {
			token: auth.token,
			user_id: user.id,
			post_id: props.data.id,
		})
		.then(res => {
			if(res.data) {
				
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

	function _handleComments() {
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
				_handleTextareaSize();
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

	function _handleDetail() {
		dispatch(ui_isload());
		axios.post(URL + 'api/post/select', {
			token: auth.token,
			id: props.data.id,
			user_id: user.id,
		})
		.then(res => {
			dispatch(content_post(res.data));
			_handleDetailLikesAndComments();
		})
		.then(() => {
			setTimeout(() => {
				dispatch(ui_isload());
			}, 500);
		});
	}

	function _handleDetailLikesAndComments() {
		axios.post(URL + 'api/reflection/selectAllByPost', {
			id: props.data.id,
		})
		.then(res => {
			dispatch(content_post_likes(res.data));
		});
		axios.post(URL + 'api/comment/selectAllByPost', {
			id: props.data.id,
		})
		.then(res => {
			dispatch(content_post_comments(res.data));
		});
	}

	function _handleTextareaSize() {
		const e = document.getElementById('post-comment-box-' + props.data.id);
		e.style.height = '5px';
		e.style.height = 'calc(' + (e.scrollHeight) + 'px - 1rem)';
	}

	return (
		<div className='post'>
			<div className='post-profile' style={
				props.data.user_picture === null
				?
				{ backgroundImage: 'url(\'' + default_user + '\')' }
				:
				{ backgroundImage: 'url(\'data:image/jpeg;base64, ' + props.data.user_picture + '\')' }
			}></div>
			<div className='post-info-container'>
				<div className='post-author'>{props.data.user_nickname}</div>
				<div className='post-time'>{props.data.post_time}</div>
				{props.data.location !== '' ? <div className='post-in'>In</div> : ''}
				{props.data.location !== '' ? <div className='post-location'>{props.data.location}</div> : ''}
				{props.data.together !== '' ? <div className='post-with'>With</div> : ''}
				{props.data.together !== '' ? <div className='post-people'>{props.data.together}</div> : ''}
				{props.data.location === '' && props.data.together === '' ? <div className='post-in'>By Camagru App</div> : '' }
			</div>
			<div className='post-picture' style={{ backgroundImage: 'url(\'data:image/jpeg;base64, ' + props.data.picture + '\')' }}></div>
			<div className='post-reflect-container'>
				{ !props.data.user_islike ? 
					<FiHeart className='post-icon' onClick={ () => _handleLikes() } /> 
					:
					<MdFavorite className='post-icon post-icon-active' onClick={ () => _handleLikes() } />
				}
				<FiMoreVertical className='post-icon' />
				{ props.data.content.length ? 
					<textarea className='post-content' style={{height: props.data.content.split('\n').length + 'rem'}} value={props.data.content} readOnly></textarea>
				: ''}
				<div className='post-likes' onClick={ () => _handleDetail() }>{props.data.num_likes} likes</div>
				<div className='post-comments' onClick={ () => _handleDetail() }>View all {props.data.num_comments} comments</div>
				<textarea className='post-comment-box' id={'post-comment-box-' + props.data.id} name='content' placeholder='Add a comment...' onChange={ () => _handleTextareaSize() }></textarea>
				<div className='post-comment-post' onClick={ () => _handleComments() }>POST</div>
			</div>
		</div>
	);
}

export default Post;

