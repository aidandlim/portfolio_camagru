import React from 'react';
import { useSelector } from 'react-redux';

import Message from '../../function/message';

import './index.css';

function Notification() {
	const notification = useSelector(state => state.notification);

	return (
		<div className='notification'>
			<div className='inner-container'>
				{notification.content.map((content, key) => 
					<Message key={key} content={content} />
				)}
			</div>
		</div>
	);
}

export default Notification;
