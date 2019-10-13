import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ui_nav, auth_token, user_user, user_biotemp, content_post, content_islikes, search_user } from '../../../actions';

import axios from 'axios';
import cookie from 'react-cookies';

import Likes from '../likes';
import Comments from '../comments';

import { confirmAlert } from 'react-confirm-alert';
import { FiHeart, FiTrash2 } from 'react-icons/fi';
import { MdFavorite } from 'react-icons/md';
import default_user from '../../../resources/default_user.png';
import './index.css';

const Detail = () => {
	const auth = useSelector(state => state.auth);
	const user = useSelector(state => state.user);
	const content = useSelector(state => state.content);
	const dispatch = useDispatch();

	const _handleLikes = () => {
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
		var posts = content.post;
		posts.num_likes = posts.num_likes + (posts.user_islike ? -1 : 1);
		if(posts.user_islike) {
			for(var i = 0; i < posts.likes.length; i++) {
				if(posts.likes[i].user_id === user.user.id) {
					posts.likes.splice(i, 1);
				}
			}
		} else {
			posts.likes.push({
				id: new Date().getMilliseconds(),
				user_id: user.user.id,
				user_nickname: user.user.nickname,
				user_picture: user.user.picture
			});
		}
		posts.user_islike = !posts.user_islike;
		dispatch(content_post(posts));
		axios.post('reflection/insert', {
			token: auth.token,
			user_id: user.user.id,
			post_id: content.post.id,
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
				message: 'This feature needs to be signed in first!',
				buttons: [
					{
						label: 'Okay'
					}
				]
			});
			return;
		}
		var posts = content.post;
		posts.num_comments = posts.num_comments + 1;
		posts.comments.push({
			id: new Date().getMilliseconds(),
			user_id: user.user.id,
			user_picture: user.user.picture,
			user_nickname: user.user.nickname,
			content: document.getElementById('detail-comment-box-' + content.post.id).value,
		});
		dispatch(content_post(posts));
		axios.post('/comment/insert', {
			token: auth.token,
			user_id: user.user.id,
			post_id: content.post.id,
			content: document.getElementById('detail-comment-box-' + content.post.id).value,
		})
		.then(res => {
			if(res.data) {
				document.getElementById('detail-comment-box-' + content.post.id).value = '';
				_handleTextareaSize();
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

	const _handleProfilePage = () => {
		axios.post('/search/select', {
			id: content.post.user_id
		})
		.then(res => {
			if(res.data !== null) {
				dispatch(search_user(res.data));
				dispatch(ui_nav(5));
			}
		});
	}

	const _handleDeletePost = () => {
		if(content.post.user_id === user.user.id) {
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
		dispatch(ui_nav(0));
		axios.post('/post/delete', {
			id: content.post.id,
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

	const _handleTextareaSize = () => {
		const e = document.getElementById('detail-comment-box-' + content.post.id);
		e.style.height = '5px';
		e.style.height = 'calc(' + (e.scrollHeight) + 'px - 1rem)';
	}

	return (
		<div className='detail'>
			<div className='inner-container'>
				<div className='detail-post'>
				<div className='post-profile' style={
					content.post.user_picture === null
					?
					{ backgroundImage: 'url(\'' + default_user + '\')' }
					:
					{ backgroundImage: 'url(\'/picture?p=' + content.post.user_picture + '\')' }
				} onClick={() => _handleProfilePage()}></div>
					<div className='post-info-container'>
						<div className='post-author' onClick={() => _handleProfilePage()}>{content.post.user_nickname}</div>
						<div className='post-time'>{content.post.post_time}</div>
						{content.post.location !== '' ? <div className='post-in'>In</div> : ''}
						{content.post.location !== '' ? <div className='post-location'>{content.post.location}</div> : ''}
						{content.post.together !== '' ? <div className='post-with'>With</div> : ''}
						{content.post.together !== '' ? <div className='post-people'>{content.post.together}</div> : ''}
						{content.post.location === '' && content.post.together === '' ? <div className='post-in'>By Camagru App</div> : '' }
					</div>
					<div className={content.post.rotate ? 'post-picture rotate' : 'post-picture'} style={{ backgroundImage: 'url(\'/picture?p=' + content.post.picture + '\')' }}></div>
					<div className='post-reflect-container'>
						{ !content.post.user_islike ? 
							<FiHeart className='post-icon' onClick={ () => _handleLikes() } /> 
							:
							<MdFavorite className='post-icon post-icon-active' onClick={ () => _handleLikes() } />
						}
						<FiTrash2 className='post-icon' onClick={ () => _handleDeletePost() } />
						{ content.post.content.length ? 
							<textarea className='post-content' style={{height: content.post === {} ? '0rem' : content.post.content.split('\n').length + 'rem'}} value={content.post.content} readOnly></textarea>
						: '' }
						<div className={ content.isLikes ? 'detail-likes-active' : 'post-likes' } onClick={ () => dispatch(content_islikes(true)) }>{content.post.num_likes} likes</div>
						<div className={ !content.isLikes ? 'detail-comments-active' : 'post-comments' } onClick={ () => dispatch(content_islikes(false)) }>View all {content.post.num_comments} comments</div>
						{ content.isLikes && content.post.likes.length !== 0 ? 
							<div className='likes'>
							{ content.post.likes.map((like) => 
								<Likes key={like.id} like={like} /> 
							)}
							</div>
						: '' }
						{ !content.isLikes && content.post.comments !== null ? 
							content.post.comments.map((comment) => 
								<Comments key={comment.id} comment={comment} /> 
						) : '' }
						<textarea className='post-comment-box' id={'detail-comment-box-' + content.post.id} name='content' placeholder='Add a comment...' onChange={ () => _handleTextareaSize() }></textarea>
						<div className='post-comment-post' onClick={ () => _handleComments() }>POST</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Detail;

