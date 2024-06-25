import { Container, Page } from "@newfold/ui-component-library";
import ComingSoon from './comingSoon';
import AutomaticUpdates from './automaticUpdates';
import WonderBlocksSettings from './wonderBlocksSettings';
import AutomaticUpdates from './automaticUpdates';
import CommentSettings from './commentSettings';
import ContentSettings from './contentSettings';

const Settings = () => {
	return (
		<Page title="Settings" className={"wppcd-app-settings-page"}>
			<Container className={'wppcd-app-settings-container'}>
				<Container.Header
					title={__('Settings', 'wp-plugin-crazy-domains')}
					description={__('This is where you can manage common settings for your website.', 'wp-plugin-crazy-domains')}
					className={'wppcd-app-settings-header'}
				/>

				<Container.Block separator={true} className={'wppcd-app-settings-coming-soon'}>
					<ComingSoon />
				</Container.Block>

				<Container.Block
					separator={ true }
					className={ 'wppcd-app-settings-wonder-blocks' }
				>
					<Container.SettingsField
						title={ __( 'Features', 'wp-plugin-crazy-domains' ) }
					></Container.SettingsField>
					<WonderBlocksSettings />
				</Container.Block>

				<Container.Block separator={true} className={'wppcd-app-settings-update'}>
					<AutomaticUpdates />
				</Container.Block>

				<Container.Block separator={true} className={'wppcd-app-settings-content'}>
					<ContentSettings />
				</Container.Block>

				<Container.Block className={'wppcd-app-settings-comments'}>
					<CommentSettings />
				</Container.Block>

			</Container>
		</Page>
	);
};

export default Settings;