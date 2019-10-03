import React from 'react';
import { useDispatch } from 'react-redux';
import { content_id } from '../../../actions';

import { FiHeart, FiMoreVertical } from 'react-icons/fi';

import './index.css';

function Post(props) {
	const dispatch = useDispatch();

	return (
		<div className='post'>
			<div className='post-profile'></div>
			<div className='post-info-container'>
				<div className='post-author'>{props.data.user_nickname}</div>
				<div className='post-time'>{props.data.post_time}</div>
				<div className='post-in'>In</div>
				<div className='post-location'>{props.data.location}</div>
				<div className='post-with'>with</div>
				<div className='post-people'>{props.data.together}</div>
			</div>
			<div className='post-picture'></div>
			<div className='post-reflect-container'>
				<FiHeart className='post-icon' />
				<FiMoreVertical className='post-icon' />
				<textarea className='post-content' style={{height: props.data.content.split('\n').length + 'rem'}} value={props.data.content} readOnly></textarea>
				<div className='post-likes' onClick={ () => dispatch(content_id(props.id)) }>{props.data.num_likes} likes</div>
				<div className='post-comments' onClick={ () => dispatch(content_id(props.id)) }>View all {props.data.num_comments} comments</div>
				<div className='post-comment-box' contentEditable='true' data-placeholder='Add a comment...'></div>
				<div className='post-comment-post'>POST</div>
			</div>
		</div>
	);
}

export default Post;

