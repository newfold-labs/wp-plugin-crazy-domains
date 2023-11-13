import AutomaticUpdates from './automaticUpdates';
import ComingSoon from './comingSoon';
import CommentSettings from './commentSettings';
import ContentSettings from './contentSettings';
import { Page } from '../../components/page';
import { SectionContainer, SectionHeader, SectionContent } from '../../components/section';

const Settings = () => {
	return (
		<Page title="Settings" className={"wppcd-app-settings-page"}>
			<SectionContainer className={'wppcd-app-settings-container'}>
				<SectionHeader
					title={__('Settings', 'wp-plugin-crazy-domains')}
					subTitle={__('This is where you can manage common settings for your website.', 'wp-plugin-crazy-domains')}
					className={'wppcd-app-settings-header'}
				/>

				<SectionContent separator={true} className={'wppcd-app-settings-coming-soon'}>
					<ComingSoon />
				</SectionContent>

				<SectionContent separator={true} className={'wppcd-app-settings-update'}>
					<AutomaticUpdates />
				</SectionContent>

				<SectionContent separator={true} className={'wppcd-app-settings-content'}>
					<ContentSettings />
				</SectionContent>

				<SectionContent className={'wppcd-app-settings-comments'}>
					<CommentSettings />
				</SectionContent>

			</SectionContainer>
		</Page>
	);
};

export default Settings;