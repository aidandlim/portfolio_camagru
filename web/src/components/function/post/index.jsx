import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ui_nav, content_post, post_posts, search_user } from '../../../actions';

import axios from 'axios';

import { confirmAlert } from 'react-confirm-alert';

import { FiHeart, FiTrash2 } from 'react-icons/fi';
import { MdFavorite } from 'react-icons/md';
import default_user from '../../../resources/default_user.jpg';
import './index.css';

function Post(props) {
	const auth = useSelector(state => state.auth);
	const user = useSelector(state => state.user);
	const post = useSelector(state => state.post);
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
		var posts = post.posts;
		for(var i = 0; i < posts.length; i++) {
			if(posts[i].id === props.data.id) {
				posts[i].num_likes = posts[i].num_likes + (posts[i].user_islike ? -1 : 1);
				posts[i].user_islike = !posts[i].user_islike;
			}
		}
		dispatch(post_posts(posts));
		axios.post('/reflection/insert', {
			token: auth.token,
			user_id: user.user.id,
			post_id: props.data.id,
		})
		.then(res => {
			if(!res.data) {
				confirmAlert({
					message: 'It seems like email or password information is wrong',
					buttons: [
						{
							label: 'Okay'
						}
					]
				});
			}
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
		var posts = post.posts;
		for(var i = 0; i < posts.length; i++) {
			if(posts[i].id === props.data.id) {
				posts[i].num_comments = posts[i].num_comments + 1;
			}
		}
		dispatch(post_posts(posts));
		axios.post('/comment/insert', {
			token: auth.token,
			user_id: user.user.id,
			post_id: props.data.id,
			content: document.getElementById('post-comment-box-' + props.data.id).value,
		})
		.then(res => {
			if(!res.data) {
				confirmAlert({
					message: 'It seems like email or password information is wrong',
					buttons: [
						{
							label: 'Okay'
						}
					]
				});
			} else {
				document.getElementById('post-comment-box-' + props.data.id).value = '';
				_handleTextareaSize();
			}
		});
	}

	function _handleDetail() {
		axios.post('/post/select', {
			token: auth.token,
			id: props.data.id,
			user_id: user.user.id,
		})
		.then(res => {
			dispatch(content_post(res.data));
			dispatch(ui_nav(6));
		})
	}

	function _handleProfilePage() {
		axios.post('/search/select', {
			id: props.data.user_id
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
	}

	function _handleDeletePost() {
		confirmAlert({
			message: 'Are you sure to delete your post?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => _processDeletePost()
				},
				{
					label: 'No'
				}
			]
		});
	}

	function _processDeletePost() {
		var posts = post.posts;
		for(var i = 0; i < posts.length; i++) {
			if(posts[i].id === props.data.id) {
				posts.splice(i, 1);
			}
		}
		dispatch(post_posts(posts));
		axios.post('/post/delete', {
			id: props.data.id,
		})
		.then(res => {
			if(!res.data) {
				confirmAlert({
					message: 'Something went wrong :(',
					buttons: [
						{
							label: 'I will try again'
						}
					]
				});
			}
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
				{ backgroundImage: 'url(\'/picture?p=' + props.data.user_picture + '\')' }
			} onClick={() => _handleProfilePage()}></div>
			<div className='post-info-container'>
				<div className='post-author' onClick={() => _handleProfilePage()}>{props.data.user_nickname}</div>
				<div className='post-time'>{props.data.post_time}</div>
				{props.data.location !== '' ? <div className='post-in'>In</div> : ''}
				{props.data.location !== '' ? <div className='post-location'>{props.data.location}</div> : ''}
				{props.data.together !== '' ? <div className='post-with'>With</div> : ''}
				{props.data.together !== '' ? <div className='post-people'>{props.data.together}</div> : ''}
				{props.data.location === '' && props.data.together === '' ? <div className='post-in'>By Camagru App</div> : '' }
			</div>
			<div className='post-picture' style={{ backgroundImage: 'url(\'/picture?p=' + props.data.picture + '\')' }} onClick={ () => _handleDetail() }></div>
			<div className='post-reflect-container'>
				{ !props.data.user_islike ? 
					<FiHeart className='post-icon' onClick={ () => _handleLikes() } /> 
					:
					<MdFavorite className='post-icon post-icon-active' onClick={ () => _handleLikes() } />
				}
				{ props.data.user_id === user.user.id ? <FiTrash2 className='post-icon' onClick={ () => _handleDeletePost() } /> : '' }
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

