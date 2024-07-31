import ActionField from "../../components/action-field";
import { Container } from "@newfold/ui-component-library";

const WebHostingSection = () => {
	return (
		<Container.SettingsField
			title={__('Web Hosting', 'wp-plugin-crazy-domains')}
			description={__('Access & manage your Carzy Domains account.', 'wp-plugin-crazy-domains')}
		>
			<div className="nfd-flex nfd-flex-col nfd-gap-5">
				<ActionField
					label={__("Manage Crazy Domains Account", "wp-plugin-crazy-domains")}
					buttonLabel={__("Manage Account", "wp-plugin-crazy-domains")}
					href={
						`https://www.crazydomains.com/?` +
						`&utm_campaign=` +
						`&utm_content=home_hosting_sites_link` +
						`&utm_term=manage_sites` +
						`&utm_medium=brand_plugin` +
						`&utm_source=wp-admin/admin.php?page=crazy-domains#/home`
					}
					target="_blank"
					className={"wppcd-app-home-sites-action"}
				>
					{__("Manage Crazy Domains account products, options and billing.", "wp-plugin-crazy-domains")}
				</ActionField>
			</div>
		</Container.SettingsField>
	);
};

export default WebHostingSection;
