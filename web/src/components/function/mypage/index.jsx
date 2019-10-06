import React from 'react';

import Album from '../album';

import { FiGrid, FiHeart, FiMessageSquare } from 'react-icons/fi';
import './index.css';

function Mypage() {

	return (
		<div className='mypage'>
			<div className='inner-container'>
				<div className='mypage-header'>
					<div className='mypage-profile-container'></div>
					<div className='mypage-profile-container'>
						<div className='mypage-profile-nickname'>Aidan Lim</div>
						<FiGrid className='mypage-table-header'>Post</FiGrid>
						<FiHeart className='mypage-table-header'>Like</FiHeart>
						<FiMessageSquare className='mypage-table-header'>Comment</FiMessageSquare>
						<div className='mypage-table-body'>15</div>
						<div className='mypage-table-body'>3</div>
						<div className='mypage-table-body'>7</div>
						<div className='mypage-profile-bio'>Hey there! I am using Camagru.</div>				
					</div>
				</div>
				<Album />
				<Album />
				<Album />
				<Album />
				<Album />
				<Album />
				<Album />
				<Album />
				<Album />
				<Album />
				<Album />
				<Album />
				<Album />
				<Album />
				<Album />
				<Album />
			</div>
		</div>
	);
}

export default Mypage;
