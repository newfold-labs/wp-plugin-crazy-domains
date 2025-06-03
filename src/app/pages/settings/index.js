import { Container, Page, Title } from "@newfold/ui-component-library";
import ComingSoon from './comingSoon';
import WonderBlocksSettings from './wonderBlocksSettings';
import AutomaticUpdates from './automaticUpdates';
import CommentSettings from './commentSettings';
import ContentSettings from './contentSettings';

const Settings = () => {
	return (
		<Page title="Settings" className={"wppcd-app-settings-page"}>
			<div
				id={ 'settings-header' }
				className={ 'wppcd-app-settings-header' }
			>
				<Title as={ 'h1' } className={ 'nfd-mb-2' }>
					{ __( 'Settings', 'wp-plugin-crazy-domains' ) }
				</Title>
				<Title as={ 'h2' } className="nfd-font-normal nfd-text-[13px]">
					{ __(
						'This is where you can manage common settings for your website.',
						'wp-plugin-crazy-domains'
					) }
				</Title>
			</div>
			<Container className={'wppcd-app-settings-container'}>

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