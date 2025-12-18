import ActionField from "../../components/action-field";
import { Container } from "@newfold/ui-component-library";

const SettingsSection = () => {
	return (
		<Container.SettingsField
			title={__('Settings and Performance', 'wp-plugin-crazy-domains')}
			description={__('Customize & fine-tune your site.', 'wp-plugin-crazy-domains')}
		>
			<div className="nfd-flex nfd-flex-col nfd-gap-5">
				<ActionField
					label={__("Manage Settings", "wp-plugin-crazy-domains")}
					buttonLabel={__("Settings", "wp-plugin-crazy-domains")}
					href={window.NewfoldRuntime.linkTracker.addUtmParams("admin.php?page=crazy-domains#/settings")}
					className={"wppcd-app-home-settings-action"}
				>
					{__('Manage your site settings. You can ajdust automatic updates, comments, revisions and more.', 'wp-plugin-crazy-domains')}
				</ActionField>

				<ActionField
					label={__("Performance", "wp-plugin-crazy-domains")}
					buttonLabel={__("Performance", "wp-plugin-crazy-domains")}
					href={window.NewfoldRuntime.linkTracker.addUtmParams(window.NewfoldRuntime.adminUrl + 'tools.php?page=nfd-performance')}
					className={"wppcd-app-home-performance-action"}
				>
					{__('Manage site performance and caching settings as well as clear the site cache.', 'wp-plugin-crazy-domains')}
				</ActionField>

				<ActionField
					label={__("Marketplace", "wp-plugin-crazy-domains")}
					buttonLabel={__("Visit Marketplace", "wp-plugin-crazy-domains")}
					href={window.NewfoldRuntime.linkTracker.addUtmParams("admin.php?page=crazy-domains#/marketplace")}
					className={"wppcd-app-home-marketplace-action"}
				>
					{__('Add site services, themes or plugins from the marketplace.', 'wp-plugin-crazy-domains')}
				</ActionField>
			</div>
		</Container.SettingsField >
	);
};

export default SettingsSection;
