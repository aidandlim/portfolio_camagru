import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { ui_nav, user_user, user_biotemp, post_posts, auth_token } from '../../../actions';

import axios from 'axios';
import cookie from 'react-cookies';

import Header from '../header';
import Body from '../body';
import Footer from '../footer';
import Sidebar from '../../function/sidebar';

import './index.css';

const App = () => {
	const ui = useSelector(state => state.ui);
	const auth = useSelector(state => state.auth);
	const post = useSelector(state => state.post);
	const dispatch = useDispatch();

	const _handleData = (token) => {
		axios.post('/user/select', {
			token: token,
		})
		.then(res => {
			if(res.data !== '') {
				dispatch(user_user(res.data));
				dispatch(user_biotemp(res.data.bio === null ? '' : res.data.bio));
			} else {
				cookie.remove('token', { path: '/'});
				dispatch(auth_token(''));
			}
		});
	}

	if(auth.token === '' && cookie.load('token') !== undefined) {
		dispatch(auth_token(cookie.load('token')));
		_handleData(cookie.load('token'));
	}

	if(ui.nav === 0 && post.posts.length === 0) {
		axios.post('/post/selectAll', {
			token: auth.token,
		})
		.then(res => {
			dispatch(post_posts(res.data));
		});
	}
	
	return (
		<div className='app no-drag'>
			<Header />
			<Body />
			<Footer />
			{ ui.nav === 1 ? <div className='sidebar-cover' onClick={() => dispatch(ui_nav(0))} /> : '' }
			{ ui.nav === 1 ? <Sidebar /> : '' }
		</div>
	);
}

export default App;
