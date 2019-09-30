import React from 'react';
import { useSelector } from 'react-redux';

import Loading from '../loading';
import Header from '../header';
import Body from '../body';
import Footer from '../footer';
import Sidebar from '../../function/sidebar';

import './index.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

function App() {
	const ui = useSelector(state => state.ui);
	
	return (
		<div className='app no-drag'>
			{ ui.isLoad ? <Loading /> : ''}
			<Header />
			<Body />
			<Footer />
			{ ui.nav === 1 ? <Sidebar /> : '' }
		</div>
	);
}

export default App;
