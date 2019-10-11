import React from 'react';

import { useDispatch } from 'react-redux';
import { ui_nav, search_user } from '../../../actions';

import axios from 'axios';

import { confirmAlert } from 'react-confirm-alert';
import default_user from '../../../resources/default_user.jpg';
import './index.css';

const Comments = (props) => {
	const dispatch = useDispatch();

	const _handleProfilePage = () => {
		axios.post('/search/select', {
			id: props.comment.user_id
		})
		.then(res => {
			if(res.data !== null) {
				dispatch(search_user(res.data));
				dispatch(ui_nav(5));
			} else {
				confirmAlert({
					message: 'Something went wrong :(',
					buttons: [
						{
							label: 'I will try again'
						}
					]
				});
			}
		});
	}

	return (
		<div className='comments'>
			<div className='comments-container'>
				<div className='comments-profile' style={
					props.comment.user_picture === null
					?
					{ backgroundImage: 'url(\'' + default_user + '\')' }
					:
					{ backgroundImage: 'url(\'/picture?p=' + props.comment.user_picture + '\')' }
				} onClick={() => _handleProfilePage()}></div>
				<textarea className='comments-content' style={{height: props.comment.content.split('\n').length + 'rem'}} value={props.comment.content} readOnly></textarea>
			</div>
		</div>
	);
}

export default Comments;

