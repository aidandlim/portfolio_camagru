import React from 'react';

import default_user from '../../../resources/default_user.jpg';
import './index.css';

function Likes(props) {
	return (
		<div className='likes-user' style={
			props.like.user_picture === null
			?
			{ backgroundImage: 'url(\'' + default_user + '\')' }
			:
			{ backgroundImage: 'url(\'data:image/jpeg;base64, ' + props.like.user_picture + '\')' }
		}></div>
	);
}

export default Likes;

