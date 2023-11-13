import ActionField from "../../components/action-field";
import { SectionSettings } from "../../components/section";

const SettingsSection = () => {
	return (
		<SectionSettings
			title={__('Settings and Performance', 'wp-plugin-crazy-domains')}
			description={__('Customize & fine-tune your site.', 'wp-plugin-crazy-domains')}
		>
			<div className="nfd-flex nfd-flex-col nfd-gap-5">
				<ActionField
					label={__("Manage Settings", "wp-plugin-crazy-domains")}
					buttonLabel={__("Settings", "wp-plugin-crazy-domains")}
					href={"#/settings"}
					className={"wppcd-app-home-settings-action"}
				>
					{__('Manage your site settings. You can ajdust automatic updates, comments, revisions and more.', 'wp-plugin-crazy-domains')}
				</ActionField>

				<ActionField
					label={__("Performance", "wp-plugin-crazy-domains")}
					buttonLabel={__("Performance", "wp-plugin-crazy-domains")}
					href={"#/performance"}
					className={"wppcd-app-home-performance-action"}
				>
					{__('Manage site performance and caching settings as well as clear the site cache.', 'wp-plugin-crazy-domains')}
				</ActionField>

				<ActionField
					label={__("Marketplace", "wp-plugin-crazy-domains")}
					buttonLabel={__("Visit Marketplace", "wp-plugin-crazy-domains")}
					href={"#/marketplace"}
					className={"wppcd-app-home-marketplace-action"}
				>
					{__('Add site services, themes or plugins from the marketplace.', 'wp-plugin-crazy-domains')}
				</ActionField>
			</div>
		</SectionSettings >
	);
};

export default SettingsSection;
