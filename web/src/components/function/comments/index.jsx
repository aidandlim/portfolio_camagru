import React from 'react';

import default_user from '../../../resources/default_user.jpg';
import './index.css';

function Comments(props) {
	return (
		<div className='comments'>
			<div className='comments-container'>
				<div className='comments-profile' style={
					props.comment.user_picture === null
					?
					{ backgroundImage: 'url(\'' + default_user + '\')' }
					:
					{ backgroundImage: 'url(\'data:image/jpeg;base64, ' + props.comment.user_picture + '\')' }
				}></div>
				<textarea className='comments-content' style={{height: props.comment.content.split('\n').length + 'rem'}} value={props.comment.content} readOnly></textarea>
			</div>
		</div>
	);
}

export default Comments;

