import './stylesheet.scss';
import ComingSoonSection from './comingSoonSection';
import WebContentSection from './webContentSection';
import WebHostingSection from './webHostingSection';
import SettingsSection from './settingsSection';
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Home = () => {
	if ( window.WPPCD.isWooActive ) {
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
