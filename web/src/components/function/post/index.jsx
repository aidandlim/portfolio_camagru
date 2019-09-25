import React from 'react';

import { FiHeart, FiMoreVertical } from 'react-icons/fi';

import './index.css';

function Post() {
	return (
		<div className='post'>
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
				<div className='post-likes'>10 likes</div>
				<div className='post-comments'>View all 6 comments</div>
				<div className='post-comment-box' contentEditable='true' data-placeholder='Add a comment...'></div>
				<div className='post-comment-post'>POST</div>
			</div>
		</div>
	);
}

export default Post;

