import './stylesheet.scss';
import ComingSoonSection from './comingSoonSection';
import WebContentSection from './webContentSection';
import WebHostingSection from './webHostingSection';
import SettingsSection from './settingsSection';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from '@wordpress/element';
import AppStore, { selectors } from '../../data/store';

const Home = () => {
	let { store } = useContext( AppStore );
	let eCommerceCapabilities = selectors.getEcommerceCapabilities(store);
	if ( eCommerceCapabilities.has("experience") ) {
		return <Navigate to="/home/store" />;
	}
	return (
		<div className="wppcd-home">
			<ComingSoonSection />
			<WebContentSection />
			<SettingsSection />
			<WebHostingSection />
		</div>
	);
};

export default Home;
