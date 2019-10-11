import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { search_keyword, search_type, search_users } from '../../../actions';

import './index.css';

const Result = () => {
	const search = useSelector(state => state.search);
	const dispatch = useDispatch();

	const _handleSearchKeyword = (e) => {
		dispatch(search_keyword(e.target.value));
	}

	const _handleSearchType = (type) => {
		dispatch(search_type(type));
	}

	const _handleForm = (e) => {
		e.preventDefault();
		dispatch(search_users([1, 2, 3]));
	}

	return (
		<div className='result'>
			<div className='inner-container'>
				<form name='result' onSubmit={_handleForm} autoComplete='off'>
					<div className='result-button-container'>
						<div className={search.type ? 'result-button' : 'result-button result-button-active'} onClick={ () => _handleSearchType(0) }>USERS</div>
						<div className={search.type ? 'result-button result-button-active' : 'result-button'} onClick={ () => _handleSearchType(1) }>POSTS</div>
					</div>
					<input className='result-input' type='text' name='keyword' placeholder='Search...' value={search.keyword} onChange={ (e) => _handleSearchKeyword(e) } />
				</form>
			</div>
		</div>
	);
}

export default Result;

