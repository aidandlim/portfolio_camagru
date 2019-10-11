import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { search_keyword, search_users } from '../../../actions';

import './index.css';

const Search = () => {
	const search = useSelector(state => state.search);
	const dispatch = useDispatch();
	
	const _handleSearchKeyword = (e) => {
		dispatch(search_keyword(e.target.value));
	}

	const _handleForm = (e) => {
		e.preventDefault();
		dispatch(search_users([1,  2, 3]));
	}

	return (
		<div className='search'>
			<form name='search' onSubmit={_handleForm} autoComplete='off'>
				<input className='search-input' type='text' name='keyword' placeholder='Search...' onChange={ (e) => _handleSearchKeyword(e) } autoFocus />
				{ search.keyword !== '' ? <p className='search-info'>Press enter to search for users & posts</p> : ''}
			</form>
		</div>
	);
}

export default Search;

