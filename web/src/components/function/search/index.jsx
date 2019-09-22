import React from 'react';

import './index.css';

function Search() {
	return (
		<div className='search'>
			<form>
				<input className='search-input' type='text' placeholder='Search...' />
			</form>
		</div>
	);
}

export default Search;
