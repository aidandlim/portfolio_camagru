import React from 'react';

import { useSelector } from 'react-redux';

import Album from '../album';

import { FiGrid, FiHeart, FiMessageSquare, FiAlertCircle, FiLock } from 'react-icons/fi';
import default_user from '../../../resources/default_user.png';
import './index.css';

const Mypage = () => {
	const user = useSelector(state => state.user);
	const search = useSelector(state => state.search);

	return (
		<div className='mypage'>
			<div className='inner-container'>
				<div className='mypage-header'>
					<div className='mypage-profile-container' style={
						search.user.picture === null
						?
						{ backgroundImage: 'url(\'' + default_user + '\')' }
						:
						{ backgroundImage: 'url(\'/picture?p=' + search.user.picture + '\')' }
					}></div>
					<div className='mypage-profile-container'>
						<div className='mypage-profile-nickname'>{search.user.nickname}</div>
						<FiGrid className='mypage-table-header'>Post</FiGrid>
						<FiHeart className='mypage-table-header'>Like</FiHeart>
						<FiMessageSquare className='mypage-table-header'>Comment</FiMessageSquare>
						<div className='mypage-table-body'>{search.user.num_posts}</div>
						<div className='mypage-table-body'>{search.user.num_likes}</div>
						<div className='mypage-table-body'>{search.user.num_comments}</div>
						<textarea className='mypage-profile-bio' 
							style={
								{height: search.user.bio === null || search.user.bio === '' || search.user.bio === undefined 
								? 
								0 
								: 
								search.user.bio.split('\n').length + 'rem'}
							} 
							value={
								search.user.bio === null || search.user.bio === '' || search.user.bio === undefined 
								? 
								'Hey there! I am using Camagru App!' 
								: 
								search.user.bio
							} 
							readOnly
						>
						</textarea>				
					</div>
				</div>
				{search.user.isPrivate === 0 || user.user.id === search.user.id
					?
					(search.user.posts.length !== 0 
						?
						search.user.posts.map((post) => 
							<Album key={post.id} data={post} />)
						:
						<div className='mypage-nopost'>
							<FiAlertCircle className='mypage-nopost-icon'/>
							THERE IS NO POST YET
						</div>
					)
					:
					(
						<div className='mypage-nopost'>
							<FiLock className='mypage-nopost-icon'/>
							THIS IS A PRIVATE ACCOUNT
						</div>
					)
				}
			</div>
		</div>
	);
}

export default Mypage;
