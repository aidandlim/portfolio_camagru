import React from 'react';
import { useDispatch } from 'react-redux';
import { ui_isload, ui_nav, search_user } from '../../../actions';

import axios from 'axios';
import { URL } from '../../../const';

import { confirmAlert } from 'react-confirm-alert';
import './index.css';

function Album(props) {
	const dispatch = useDispatch();

	function _handleProfilePage() {
		dispatch(ui_isload());
		axios.post(URL + 'api/search/select', {
			id: props.data.user_id
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
