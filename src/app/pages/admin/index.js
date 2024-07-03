import { Container, Page } from '@newfold/ui-component-library';
// import HelpCenterSettings from '../settings/helpCenterSettings';
import WonderBlocksSettings from '../settings/wonderBlocksSettings';
// import StagingFeatureSettings from '../settings/stagingFeatureSettings';
import PerformanceFeatureSettings from '../settings/performanceFeatureSettings';

const Admin = () => {
	return (
		<Page title="Admin" className={ 'wppcd-app-settings-page' }>
			<Container className={ 'wppcd-app-settings-container' }>
				<Container.Header
					title={ __( 'Admin', 'wp-plugin-crazy-domains' ) }
					description={ __(
						'Secret page to manage admin features and settings.',
						'wp-plugin-crazy-domains'
					) }
					className={ 'wppcd-app-settings-header' }
				/>

				<Container.Block
					separator={ true }
					id={ 'help-center' }
					className={ classNames( 'wppcd-app-admin' ) }
				>
					<Container.SettingsField
						title="Features"
						description="Toggle features – not settings."
					>
						<WonderBlocksSettings />
						<br />
						<PerformanceFeatureSettings />
					</Container.SettingsField>
				</Container.Block>
			</Container>
		</Page>
	);
};

export default Admin;