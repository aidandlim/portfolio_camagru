import React from 'react';

import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { search_keyword, search_type, search_users, search_posts} from '../../../actions';

import './index.css';

const Search = () => {
	const search = useSelector(state => state.search);
	const dispatch = useDispatch();
	
	const _handleSearchKeyword = (e) => {
		dispatch(search_keyword(e.target.value));
	}

	const _handleSearchType = (type) => {
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
	}

	const _handleForm = (e) => {
		e.preventDefault();
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

	return (
		<div className='search'>
			<div className='inner-container'>
				<form name='search' onSubmit={_handleForm} autoComplete='off'>
					<div className='search-button-container'>
						<div className={search.type ? 'search-button' : 'search-button search-button-active'} onClick={ () => _handleSearchType(0) }>USERS</div>
						<div className={search.type ? 'search-button search-button-active' : 'search-button'} onClick={ () => _handleSearchType(1) }>POSTS</div>
					</div>
					<input className='search-input' type='text' name='keyword' placeholder='Search...' onChange={ (e) => _handleSearchKeyword(e) } autoFocus />
					{ search.users.length === 0 && search.posts.length === 0 ? <p className='search-info'>Press enter to search for users & posts</p> : ''}
				</form>
			</div>
		</div>
	);
}

export default Search;

