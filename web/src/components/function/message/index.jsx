import React from 'react';

import './index.css';

function Message() {
	return (
		<div className='message'>
			<div className='message-profile'></div>
			<div className='message-author'>Aidan Lim</div>
			<div className='message-content'>likes your post!</div>
			<div className='message-time'>3 HOURS AGO</div>
		</div>
	);
}

export default Message;
