import ActionField from "../../components/action-field";
import { Container } from "@newfold/ui-component-library";

const WebContentSection = () => {
	return (
		<Container.SettingsField
			title={__('Website Content', 'wp-plugin-crazy-domains')}
			description={__('Create, manage & sort your story.', 'wp-plugin-crazy-domains')}
		>
			<div className="nfd-flex nfd-flex-col nfd-gap-5">
				<ActionField
					label={__("Blog", "wp-plugin-crazy-domains")}
					buttonLabel={__("New Post", "wp-plugin-crazy-domains")}
					href={window.NewfoldRuntime.linkTracker.addUtmParams(window.NewfoldRuntime.adminUrl + 'post-new.php')}
					className={"wppcd-app-home-blog-action"}
				>
					{__('Write a new blog post.', 'wp-plugin-crazy-domains')}
				</ActionField>

				<ActionField
					label={__("Pages", "wp-plugin-crazy-domains")}
					buttonLabel={__("New Page", "wp-plugin-crazy-domains")}
					href={window.NewfoldRuntime.linkTracker.addUtmParams(window.NewfoldRuntime.adminUrl + 'post-new.php?post_type=page')}
					className={"wppcd-app-home-pages-action"}
				>
					{__('Add fresh pages to your website.', 'wp-plugin-crazy-domains')}
				</ActionField>

				<ActionField
					label={__("Categories", "wp-plugin-crazy-domains")}
					buttonLabel={__("Manage Categories", "wp-plugin-crazy-domains")}
					href={window.NewfoldRuntime.linkTracker.addUtmParams(window.NewfoldRuntime.adminUrl + 'edit-tags.php?taxonomy=category')}
					className={"wppcd-app-home-categories-action"}
				>
					{__('Organize existing content into categories.', 'wp-plugin-crazy-domains')}
				</ActionField>
			</div>
		</Container.SettingsField >
	);
};

export default WebContentSection;
