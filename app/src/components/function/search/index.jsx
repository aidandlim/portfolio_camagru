import React from 'react';

import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { ui_nav, search_keyword, search_type, search_users, search_posts, search_user, content_post} from '../../../actions';

import { isMobile } from "react-device-detect";

import default_user from '../../../resources/default_user.png';
import './index.css';

const Search = () => {
	const auth = useSelector(state => state.auth);
	const search = useSelector(state => state.search);
	const dispatch = useDispatch();
	
	const _handleSearchKeyword = (e) => {
		dispatch(search_keyword(e.target.value));
	}

	const _handleSearchType = (type) => {
		if(search.keyword !== '') {
			axios.post(type ? '/search/selectAllPostByKeyword' : '/search/selectAllUserByKeyword', {
				keyword: search.keyword
			})
			.then(res => {
				if(type) {
					dispatch(search_posts(res.data));
					dispatch(search_users([]));
				} else {
					dispatch(search_users(res.data));
					dispatch(search_posts([]));
				}
				dispatch(search_type(type));
			});
		} else {
			dispatch(search_type(type));
		}
	}

	const _handleForm = (e) => {
		e.preventDefault();
		if(search.keyword !== '') {
			axios.post(search.type ? '/search/selectAllPostByKeyword' : '/search/selectAllUserByKeyword', {
				keyword: search.keyword
			})
			.then(res => {
				if(search.type) {
					dispatch(search_posts(res.data));
					dispatch(search_users([]));
				} else {
					dispatch(search_users(res.data));
					dispatch(search_posts([]));
				}
			});
		}
	}

	const _handleDetail = (id) => {
		axios.post('/post/select', {
			token: auth.token,
			id: id,
		})
		.then(res => {
			dispatch(content_post(res.data));
			dispatch(ui_nav(6));
		});
	}

	const _handleProfilePage = (id) => {
		axios.post('/search/select', {
			id: id
		})
		.then(res => {
			if(res.data !== null) {
				dispatch(search_user(res.data));
				dispatch(ui_nav(5));
			}
		});
	}

	return (
		<div className='search'>
			<div className='inner-container'>
				<form name='search' onSubmit={_handleForm} autoComplete='off'>
					<div className='search-button-container'>
						<div className={search.type ? 'search-button' : 'search-button search-button-active'} onClick={ () => _handleSearchType(0) }>USERS</div>
						<div className={search.type ? 'search-button search-button-active' : 'search-button'} onClick={ () => _handleSearchType(1) }>POSTS</div>
					</div>
					<input className='search-input' type='text' name='keyword' placeholder='Search...' value={search.keyword} onChange={ (e) => _handleSearchKeyword(e) } autoFocus />
					{ search.users.length === 0 && search.posts.length === 0 ? <p className='search-info'>Press enter to search for users & posts</p> : ''}
				</form>
				{ search.type === 0 ? search.users.map((user, index) => 
					<div className='search-user-container' key={index} onClick={ () => _handleProfilePage(user.id) }>
						<div className='search-user-profile'  style={
							user.picture === null
							?
							{ backgroundImage: 'url(\'' + default_user + '\')' }
							:
							{ backgroundImage: 'url(\'/picture?p=' + user.picture + '\')' }
						}></div>
						<div className='search-user-nickname'>@{user.nickname}</div>
						<div className='search-user-bio'>{user.bio}</div>
					</div>
				) : ''}
				<div className='search-post-container'>
					{ search.type === 1 ? search.posts.map((post, index) => 
						<div className={isMobile ? 'search-post search-post-mobile' : 'search-post'} onClick={ () => _handleDetail(post.id) } key={index}>
							<img className='search-picture' src={'/picture?p=' + post.picture} onLoad={ () => document.getElementById('search-load-' + post.id).style.display = 'none' } alt='post' />
							<div id={'search-load-' + post.id} className={isMobile ? 'search-load search-load-mobile' : 'search-load'}><div className='slider'></div></div>
						</div>
					) : ''}
				</div>
			</div>
		</div>
	);
}

export default Search;

