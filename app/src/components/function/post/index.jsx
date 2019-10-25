import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ui_nav, content_post, content_islikes, post_posts, search_user, auth_token, user_user, user_biotemp, post_isdone } from '../../../actions';

import axios from 'axios';
import cookie from 'react-cookies';

import { confirmAlert } from 'react-confirm-alert';
import { FiHeart, FiTrash2, FiFacebook, FiTwitter } from 'react-icons/fi';
import { MdFavorite } from 'react-icons/md';
import default_user from '../../../resources/default_user.png';
import './index.css';

const Post = (props) => {
	const auth = useSelector(state => state.auth);
	const user = useSelector(state => state.user);
	const post = useSelector(state => state.post);
	const dispatch = useDispatch();

	const _handleLikes = () => {
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
		let posts = post.posts;
		for(let i = 0; i < posts.length; i++) {
			if(posts[i].id === props.data.id) {
				posts[i].num_likes = posts[i].num_likes + (posts[i].user_islike ? -1 : 1);
				posts[i].user_islike = !posts[i].user_islike;
			}
		}
		dispatch(post_posts(posts));
		axios.post('/reflection/insert', {
			token: auth.token,
			user_id: user.user.id,
			user_nickname: user.user.nickname,
			post_id: props.data.id,
		})
		.then(res => {
			if(!res.data) {
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

	const _handleComments = () => {
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
		if(document.getElementById('post-comment-box-' + props.data.id).value === '') {
			confirmAlert({
				message: 'Write the comment first',
				buttons: [
					{
						label: 'Okay'
					}
				]
			});
			return;
		}
		let posts = post.posts;
		for(let i = 0; i < posts.length; i++) {
			if(posts[i].id === props.data.id) {
				posts[i].num_comments = posts[i].num_comments + 1;
			}
		}
		let value = document.getElementById('post-comment-box-' + props.data.id).value;
		document.getElementById('post-comment-box-' + props.data.id).value = '';
		_handleTextareaSize();
		dispatch(post_posts(posts));
		axios.post('/comment/insert', {
			token: auth.token,
			user_id: user.user.id,
			user_nickname: user.user.nickname,
			post_id: props.data.id,
			content: value,
		})
		.then(res => {
			if(!res.data) {
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

	const _handleDetail = (type) => {
		axios.post('/post/select', {
			token: auth.token,
			id: props.data.id,
			user_id: user.user.id,
		})
		.then(res => {
			if(type) {
				dispatch(content_islikes(true));
			} else {
				dispatch(content_islikes(false));
			}
			dispatch(content_post(res.data));
			dispatch(ui_nav(6));
		})
	}

	const _handleProfilePage = () => {
		axios.post('/search/select', {
			id: props.data.user_id
		})
		.then(res => {
			if(res.data !== null) {
				dispatch(search_user(res.data));
				dispatch(ui_nav(5));
			}
		})
	}

	const _handleDeletePost = () => {
		if(props.data.user_id === user.user.id) {
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

	const _processDeletePost = () => {
		let posts = post.posts;
		for(let i = 0; i < posts.length; i++) {
			if(posts[i].id === props.data.id) {
				posts.splice(i, 1);
			}
		}
		if(posts.length > 0)
			dispatch(post_posts(posts));
		axios.post('/post/delete', {
			token: auth.token,
			id: props.data.id,
		})
		.then(res => {
			if(!res.data) {
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
			} else {
				if(posts.length === 0) {
					dispatch(post_posts([]));
					dispatch(post_isdone(false));
				}
			}
		});
	}

	const _handleShareToFacebook = () => {
		const url = 'https://camagru.aidandlim.com:8443/share?sid=' + props.data.id;
		window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, 'Share to Facebook','height=500, width=500');
	}

	const _handleShareToTwitter = () => {
		const url = 'https://camagru.aidandlim.com:8443/share?sid=' + props.data.id;
		window.open('https://twitter.com/intent/tweet?url=' + url, 'Share to Twitter','height=500, width=500');
	}

	const _handleTextareaSize = () => {
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
			<img className='post-picture' src={'/picture?p=' + props.data.picture} onClick={ () => _handleDetail() } onLoad={ () => document.getElementById('post-load-' + props.data.id).style.display = 'none' } alt='post' />
			<div id={'post-load-' + props.data.id} className='post-load'><div className='slider'></div></div>
			<div className='post-reflect-container'>
				{ !props.data.user_islike ? 
					<FiHeart className='post-icon' onClick={ () => _handleLikes() } /> 
					:
					<MdFavorite className='post-icon post-icon-active' onClick={ () => _handleLikes() } />
				}
				{ props.data.user_id === user.user.id ? <FiFacebook className='post-icon' onClick={ () => _handleShareToFacebook() }/> : <div className='post-icon'></div> }
				{ props.data.user_id === user.user.id ? <FiTwitter className='post-icon' onClick={ () => _handleShareToTwitter() } /> : <div className='post-icon'></div> }
				{ props.data.user_id === user.user.id ? <FiTrash2 className='post-icon' onClick={ () => _handleDeletePost() } /> : <div className='post-icon'></div> }
				{ props.data.content.length ? 
					<textarea className='post-content' style={{height: props.data.content.split('\n').length + 'rem'}} value={props.data.content} readOnly></textarea>
				: ''}
				<div className='post-likes' onClick={ () => _handleDetail(1) }>{props.data.num_likes} likes</div>
				<div className='post-comments' onClick={ () => _handleDetail(0) }>View all {props.data.num_comments} comments</div>
				<textarea className='post-comment-box' id={'post-comment-box-' + props.data.id} name='content' placeholder='Add a comment...' onChange={ () => _handleTextareaSize() }></textarea>
				<div className='post-comment-post' onClick={ () => _handleComments() }>POST</div>
			</div>
		</div>
	);
}

export default Post;

