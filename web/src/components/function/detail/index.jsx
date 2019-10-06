import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ui_isload, content_post, content_post_likes, content_post_comments, content_islikes } from '../../../actions';

import axios from 'axios';
import { URL } from '../../../const';

import Likes from '../likes';
import Comments from '../comments';

import { confirmAlert } from 'react-confirm-alert';

import { FiArrowLeftCircle, FiHeart, FiMoreVertical } from 'react-icons/fi';
import { MdFavorite } from 'react-icons/md';
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
			post_id: content.post.id,
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
			post_id: content.post.id,
			content: document.getElementById('detail-comment-box-' + content.post.id).value,
		})
		.then(res => {
			if(res.data) {
				document.getElementById('detail-comment-box-' + content.post.id).value = '';
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
			id: content.post.id,
			user_id: user.id,
		})
		.then(res => {
			dispatch(content_post(res.data));
			_handleDetailLikesAndComments();
		});
	}

	function _handleDetailLikesAndComments() {
		axios.post(URL + 'api/reflection/selectAllByPost', {
			id: content.post.id,
		})
		.then(res => {
			dispatch(content_post_likes(res.data));
		});
		axios.post(URL + 'api/comment/selectAllByPost', {
			id: content.post.id,
		})
		.then(res => {
			dispatch(content_post_comments(res.data));
		});
	}

	function _handleTextareaSize() {
		const e = document.getElementById('detail-comment-box-' + content.post.id);
		e.style.height = '5px';
		e.style.height = 'calc(' + (e.scrollHeight) + 'px - 1rem)';
	}

	return (
		<div className='detail'>
			<FiArrowLeftCircle className='detail-rollback' onClick={ () => dispatch(content_post({})) } />
			<div className='inner-container'>
				<div className='detail-post'>
					<div className='post-profile' style={{ backgroundImage: 'url(\'data:image/jpeg;base64, ' + content.post.user_picture + '\')' }}></div>
					<div className='post-info-container'>
						<div className='post-author'>{content.post.user_nickname}</div>
						<div className='post-time'>{content.post.post_time}</div>
						{content.post.location !== '' ? <div className='post-in'>In</div> : ''}
						{content.post.location !== '' ? <div className='post-location'>{content.post.location}</div> : ''}
						{content.post.together !== '' ? <div className='post-with'>With</div> : ''}
						{content.post.together !== '' ? <div className='post-people'>{content.post.together}</div> : ''}
						{content.post.location === '' && content.post.together === '' ? <div className='post-in'>By Camagru App</div> : '' }
					</div>
					<div className='post-picture' style={{ backgroundImage: 'url(\'data:image/jpeg;base64, ' + content.post.picture + '\')' }}></div>
					<div className='post-reflect-container'>
						{ !content.post.user_islike ? 
							<FiHeart className='post-icon' onClick={ () => _handleLikes() } /> 
							:
							<MdFavorite className='post-icon post-icon-active' onClick={ () => _handleLikes() } />
						}
						<FiMoreVertical className='post-icon' />
						{ content.post.content.length ? 
							<textarea className='post-content' style={{height: content.post === {} ? '0rem' : content.post.content.split('\n').length + 'rem'}} value={content.post.content} readOnly></textarea>
						: '' }
						<div className={ content.isLikes ? 'detail-likes-active' : 'post-likes' } onClick={ () => dispatch(content_islikes(true)) }>{content.post.num_likes} likes</div>
						<div className={ !content.isLikes ? 'detail-comments-active' : 'post-comments' } onClick={ () => dispatch(content_islikes(false)) }>View all {content.post.num_comments} comments</div>
						{ content.isLikes && content.post_likes.length !== 0 ? 
							<div className='likes'>
							{ content.isLikes ? content.post_likes.map((like) => 
								<Likes key={like.id} like={like} /> 
							) : '' }
							</div>
						: '' }
						{ !content.isLikes ? content.post_comments.map((comment) => 
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

