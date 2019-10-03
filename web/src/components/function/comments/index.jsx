import React from 'react';

import './index.css';

function Comments(props) {
	return (
		<div className='comments'>
			<div className='comments-container'>
				<div className='comments-profile'></div>
				<textarea className='comments-content' style={{height: props.comment.content.split('\n').length + 'rem'}} value={props.comment.content} readOnly></textarea>
			</div>
		</div>
	);
}

export default Comments;

