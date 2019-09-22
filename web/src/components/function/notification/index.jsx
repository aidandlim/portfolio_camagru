import React from 'react';

import Message from '../../function/message';

import './index.css';

function Notification() {
	return (
		<div className='notification'>
			<div className='inner-container'>
				<Message />
				<Message />
			</div>
		</div>
	);
}

export default Notification;
