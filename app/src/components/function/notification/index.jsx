import React from 'react';

import { useSelector } from 'react-redux';

import Message from '../../function/message';

import { FiAlertCircle } from 'react-icons/fi';
import './index.css';

const Notification = () => {
	const notification = useSelector(state => state.notification);

	return (
		<div className='notification'>
			<div className='inner-container'>
			{notification.content.length !== 0 
				?
				notification.content.map((content, key) => 
					<Message key={key} content={content} />)
				:
				<div className='notification-nopost'>
					<FiAlertCircle className='notification-nopost-icon'/>
					THERE IS NO NOTIFICATION YET
				</div>
			}
			</div>
		</div>
	);
}

export default Notification;
