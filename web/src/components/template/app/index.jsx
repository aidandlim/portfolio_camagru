import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ui_nav, post_posts } from '../../../actions';

import axios from 'axios';
import { URL } from '../../../const';

import Loading from '../loading';
import Header from '../header';
import Body from '../body';
import Footer from '../footer';
import Sidebar from '../../function/sidebar';

import './index.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

function App() {
	const ui = useSelector(state => state.ui);
	const auth = useSelector(state => state.auth);
	const post = useSelector(state => state.post);
	const dispatch = useDispatch();

	if(ui.nav === 0 && post.posts.length === 0) {
		axios.post(URL + 'api/post/selectAll', {
			token: auth.token
		})
		.then(res => {
			dispatch(post_posts(res.data));
		});
	}
	
	return (
		<div className='app no-drag'>
			{ ui.isLoad || (ui.nav === 0 && post.posts.length === 0) ? <Loading /> : ''}
			<Header />
			<Body />
			<Footer />
			{ ui.nav === 1 ? <div className='sidebar-cover' onClick={() => dispatch(ui_nav(0))} /> : '' }
			{ ui.nav === 1 ? <Sidebar /> : '' }
		</div>
	);
}

export default App;
