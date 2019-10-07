import React from 'react';
import { useDispatch } from 'react-redux';
import { ui_isload, ui_nav, content_post } from '../../../actions';

import axios from 'axios';
import { URL } from '../../../const';

import { confirmAlert } from 'react-confirm-alert';
import './index.css';

function Album(props) {
	const dispatch = useDispatch();

	function _handleProfilePage() {
		dispatch(ui_isload());
		axios.post(URL + 'api/post/select', {
			id: props.data.id
		})
		.then(res => {
			if(res.data !== null) {
				dispatch(content_post(res.data));
				dispatch(ui_nav(6));
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
		})
		.then(() => {
			dispatch(ui_isload());
		});
	}

	return (
		<div className='album' style={{ backgroundImage: 'url(\'data:image/jpeg;base64, ' + props.data.picture + '\')' }} onClick={() => _handleProfilePage()}>
			
		</div>
	);
}

export default Album;
