import { Page } from '../../components/page';
import { SectionContainer, SectionHeader, SectionContent } from '../../components/section';
import ComingSoon from '../settings/comingSoon';
import SettingsSection from './settingsSection';
import WebContentSection from './webContentSection';
import WebHostingSection from './webHostingSection';
import WelcomeSection from './welcomeSection';

const Home = () => {
	return (
		<Page title="Settings" className={"wppcd-app-home-page wppcd-home"}>
			<WelcomeSection />
			<SectionContainer className={'wppcd-app-home-container'}>
				<SectionHeader
					title={__('More', 'wp-plugin-carzy-domains')}
					className={'wppcd-app-home-header display-none'}
				/>
				<SectionContent separator={true} className={'wppcd-app-home-coming-soon'}>
					<ComingSoon />
				</SectionContent>

				<SectionContent separator={true} className={'wppcd-app-home-content'}>
					<WebContentSection />
				</SectionContent>

				<SectionContent separator={true} className={'wppcd-app-home-settings'}>
					<SettingsSection />
				</SectionContent>

				<SectionContent separator={false} className={'wppcd-app-home-hosting'}>
					<WebHostingSection />
				</SectionContent>
			</SectionContainer>
		</Page>
	);
};

export default Home;
