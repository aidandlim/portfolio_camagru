import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ui_isload, content_id, content_picture, content_content, content_location, content_together, content_post_time, content_num_likes, content_num_comments, content_user_nickname, content_user_islike, content_islikes } from '../../../actions';

import axios from 'axios';
import { URL } from '../../../const';

import Likes from '../likes';
import Comments from '../comments';

import { confirmAlert } from 'react-confirm-alert';

import { FiArrowLeftCircle, FiHeart, FiMoreVertical } from 'react-icons/fi';
import './index.css';

function Detail() {
	const auth = useSelector(state => state.auth);
	const user = useSelector(state => state.user);
	const content = useSelector(state => state.content);
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
			post_id: content.id,
		})
		.then(res => {
			if(res.data) {
				_handleDetail();
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
			post_id: content.id,
			content: document.getElementById('post-comment-box-' + content.id).value,
		})
		.then(res => {
			if(res.data) {
				document.getElementById('detail-comment-box-' + content.id).value = '';
				_handleTextareaSize();
				_handleDetail();
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
		axios.post(URL + 'api/post/select', {
			token: auth.token,
			id: content.id,
			user_id: user.id,
		})
		.then(res => {
			dispatch(content_id(res.data.id));
			dispatch(content_picture(res.data.picture));
			dispatch(content_content(res.data.content));
			dispatch(content_location(res.data.location));
			dispatch(content_together(res.data.together));
			dispatch(content_post_time(res.data.post_time));
			dispatch(content_num_likes(res.data.num_likes));
			dispatch(content_num_comments(res.data.num_comments));
			dispatch(content_user_nickname(res.data.user_nickname));
			dispatch(content_user_islike(res.data.user_islike));
		});
	}

	function _handleTextareaSize() {
		const e = document.getElementById('detail-comment-box-' + content.id);
		e.style.height = '5px';
		e.style.height = 'calc(' + (e.scrollHeight) + 'px - 1rem)';
	}

	return (
		<div className='detail'>
			<FiArrowLeftCircle className='detail-rollback' onClick={ () => dispatch(content_id(-1)) } />
			<div className='inner-container'>
				<div className='detail-post'>
					<div className='post-profile'></div>
					<div className='post-info-container'>
						<div className='post-author'>{content.user_nickname}</div>
						<div className='post-time'>{content.post_time}</div>
						{content.location !== '' ? <div className='post-in'>In</div> : ''}
						{content.location !== '' ? <div className='post-location'>{content.location}</div> : ''}
						{content.together !== '' ? <div className='post-with'>With</div> : ''}
						{content.together !== '' ? <div className='post-people'>{content.together}</div> : ''}
						{content.location === '' && content.together === '' ? <div className='post-in'>By Camagru App</div> : '' }
					</div>
					<div className='post-picture'></div>
					<div className='post-reflect-container'>
						<FiHeart className={content.user_islike ? 'post-icon post-icon-active' : 'post-icon'} onClick={ () => _handleLikes() } />
						<FiMoreVertical className='post-icon' />
						<textarea className='post-content' style={{height: content.content.split('\n').length + 'rem'}} value={content.content} readOnly></textarea>
						<div className={ content.isLikes ? 'detail-likes-active' : 'post-likes' } onClick={ () => dispatch(content_islikes(true)) }>{content.num_likes} likes</div>
						<div className={ !content.isLikes ? 'detail-comments-active' : 'post-comments' } onClick={ () => dispatch(content_islikes(false)) }>View all {content.num_comments} comments</div>
						{ content.isLikes ? <Likes /> : '' }
						{ !content.isLikes ? <Comments /> : '' }
						<textarea className='post-comment-box' id={'detail-comment-box-' + content.id} name='content' placeholder='Add a comment...' onChange={ () => _handleTextareaSize() }></textarea>
						<div className='post-comment-post' onClick={ () => _handleComments() }>POST</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Detail;

