import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { content_id, content_islikes } from '../../../actions';

import Likes from '../likes';
import Comments from '../comments';

import { FiArrowLeftCircle, FiHeart, FiMoreVertical } from 'react-icons/fi';
import './index.css';

function Detail() {
	const content = useSelector(state => state.content);
	const dispatch = useDispatch();

	return (
		<div className='detail'>
			<FiArrowLeftCircle className='detail-rollback' onClick={ () => dispatch(content_id(-1)) } />
			<div className='inner-container'>
				<div className='detail-post'>
					<div className='post-profile'></div>
					<div className='post-info-container'>
						<div className='post-author'>Ariana Grande</div>
						<div className='post-time'>3 HOURS AGO</div>
						<div className='post-in'>In</div>
						<div className='post-location'>42 Silicon Valley</div>
						<div className='post-with'>with</div>
						<div className='post-people'>Luke Kim</div>
					</div>
					<div className='post-picture'></div>
					<div className='post-reflect-container'>
						<FiHeart className='post-icon' />
						<FiMoreVertical className='post-icon' />
						<div className='post-content'>
							Hello World!<br />
							Good Morning!
						</div>
						<div className={ content.isLikes ? 'detail-likes-active' : 'post-likes' } onClick={ () => dispatch(content_islikes(true)) }>10 likes</div>
						<div className={ !content.isLikes ? 'detail-comments-active' : 'post-comments' } onClick={ () => dispatch(content_islikes(false)) }>View all 6 comments</div>
						{ content.isLikes ? <Likes /> : '' }
						{ !content.isLikes ? <Comments /> : '' }
						<div className='post-comment-box' contentEditable='true' data-placeholder='Add a comment...'></div>
						<div className='post-comment-post'>POST</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Detail;

