import { Page, Container } from "@newfold/ui-component-library";
import SettingsSection from './settingsSection';
import WebContentSection from './webContentSection';
import WebHostingSection from './webHostingSection';

const Home = () => {

	useEffect( () => {
		// run when mounts
		const comingSoonPortal =
			document.getElementById( 'coming-soon-portal' );

		if ( comingSoonPortal ) {
			window.NFDPortalRegistry.registerPortal(
				'coming-soon',
				comingSoonPortal
			);
		}

		// run when unmounts
		return () => {
			window.NFDPortalRegistry.unregisterPortal( 'coming-soon' );
		};
	}, [] );

	return (
		<Page title="Settings" className={"wppcd-app-home-page wppcd-home"}>
			{/* <WelcomeSection /> */}
			<Container className="nfd-max-w-full nfd-p-8 nfd-shadow-none nfd-rounded-xl nfd-border nfd-border-[#D5D5D5]">
				<div id="coming-soon-portal" />
			</Container>
			<Container className={'wppcd-app-home-container'}>
				<Container.Header
					title={__('More', 'wp-plugin-carzy-domains')}
					className={'wppcd-app-home-header display-none'}
				/>
				{/* <Container.Block separator={true} className={'wppcd-app-home-coming-soon'}>
					<ComingSoon />
				</Container.Block> */}

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
