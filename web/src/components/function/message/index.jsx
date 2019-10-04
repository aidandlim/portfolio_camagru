import React from 'react';

import default_user from '../../../resources/default_user.jpg';
import './index.css';

function Message(props) {
	return (
		<div className='message'>
			<div className='message-profile' style={
				props.content.user_picture === null
				?
				{ backgroundImage: 'url(\'' + default_user + '\')' }
				:
				{ backgroundImage: 'url(\'data:image/jpeg;base64, ' + props.content.user_picture + '\')' }
			}></div>
			<div className='message-author'>{props.content.user_nickname}</div>
			<div className='message-content'>{props.content.type === 'likes' ? 'liked your post!' : 'commented your post!'}</div>
			<div className='message-time'>{props.content.time}</div>
		</div>
	);
}

export default Message;
