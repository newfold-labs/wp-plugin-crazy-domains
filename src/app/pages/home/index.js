import { Page, Container } from "@newfold/ui-component-library";
import ComingSoon from '../settings/comingSoon';
import SettingsSection from './settingsSection';
import WebContentSection from './webContentSection';
import WebHostingSection from './webHostingSection';
import WelcomeSection from './welcomeSection';

const Home = () => {
	return (
		<Page title="Settings" className={"wppcd-app-home-page wppcd-home"}>
			<WelcomeSection />
			<Container className={'wppcd-app-home-container'}>
				<Container.Header
					title={__('More', 'wp-plugin-carzy-domains')}
					className={'wppcd-app-home-header display-none'}
				/>
				<Container.Block separator={true} className={'wppcd-app-home-coming-soon'}>
					<ComingSoon />
				</Container.Block>

				<Container.Block separator={true} className={'wppcd-app-home-content'}>
					<WebContentSection />
				</Container.Block>

				<Container.Block separator={true} className={'wppcd-app-home-settings'}>
					<SettingsSection />
				</Container.Block>

				<Container.Block separator={false} className={'wppcd-app-home-hosting'}>
					<WebHostingSection />
				</Container.Block>
			</Container>
		</Page>
	);
};

export default Home;
