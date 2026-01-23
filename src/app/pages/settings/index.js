import { Container, Page, Title } from "@newfold/ui-component-library";
import { useEffect } from '@wordpress/element';

import ComingSoon from './comingSoon';
import WonderBlocksSettings from './wonderBlocksSettings';
import AutomaticUpdates from './automaticUpdates';
import CommentSettings from './commentSettings';
import ContentSettings from './contentSettings';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

const Settings = () => {
	const isPerformanceEnabled =
		window.NewfoldFeatures.features.performance === true;
	const isStagingEnabled =
		window.NewfoldFeatures.features.staging === true;

		const location = useLocation();

		useEffect( () => {
		// run when mounts
		const performancePortal =
			document.getElementById( 'performance-portal' );
		const stagingPortal =
			document.getElementById( 'staging-portal' );
		if ( performancePortal ) {
			window.NFDPortalRegistry.registerPortal(
				'performance',
				performancePortal
			);
		}
		if ( stagingPortal ) {
			window.NFDPortalRegistry.registerPortal(
				'staging',
				stagingPortal
			);
		}
		// run when unmounts
		return () => {
			window.NFDPortalRegistry.unregisterPortal( 'performance' );
			window.NFDPortalRegistry.unregisterPortal( 'staging' );
		};
	}, [] );

	// Auto-open accordion sections based on URL hash
	useEffect( () => {
		const path = location.pathname;

		// Close all accordion sections first
		const allDetails = document.querySelectorAll( '.nfd-details' );
		allDetails.forEach( ( details ) => {
			details.removeAttribute( 'open' );
		} );

		// Map URL paths to accordion selectors
		const accordionMap = {
			'/settings/staging': '.staging-details',
			'/settings/performance': '.performance-details',
			'/settings': '.settings-details',
		};

		// Open the appropriate accordion section
		const targetSelector = accordionMap[ path ];
		if ( targetSelector ) {
			const targetDetails = document.querySelector( targetSelector );
			if ( targetDetails ) {
				targetDetails.setAttribute( 'open', 'true' );
			}
		}
	}, [ location.pathname ] );
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
				<details className="nfd-details settings-app-wrapper settings-details">
					<summary>
						<div
							id={ 'settings-header' }
							className={ 'wppcd-app-settings-header' }
						>
							<Title as={ 'h1' } className={ 'nfd-mb-2' }>
								{ __(
									'General Settings',
									'wp-plugin-crazy-domains'
								) }
							</Title>
							<Title
								as={ 'h2' }
								className="nfd-font-normal nfd-text-[13px]"
							>
								{ __(
									'Manage common settings for your website',
									'wp-plugin-crazy-domains'
								) }
							</Title>
						</div>
						<span className="nfd-details-icon">
							<ChevronUpIcon />
						</span>
					</summary>
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
				</details>
			</Container>

			{ isPerformanceEnabled && (
				<Container
					id="nfd-performance"
					className={ 'nfd-settings-app-wrapper nfd-performance' }
				>
					<details className="nfd-details settings-app-wrapper performance-details">
						<summary>
							<div
								id={ 'performance-header' }
								className={ 'wppcd-app-performance-header' }
							>
								<Title as={ 'h1' } className={ 'nfd-mb-2' }>
									{ __(
										'Performance',
										'wp-plugin-crazy-domains'
									) }
								</Title>
								<Title
									as={ 'h2' }
									className="nfd-font-normal nfd-text-[13px]"
								>
									{ __(
										'Optimize your website by managing cache and performance settings',
										'wp-plugin-crazy-domains'
									) }
								</Title>
							</div>
							<span className="nfd-details-icon">
								<ChevronUpIcon />
							</span>
						</summary>
						<div id="nfd-performance-portal-wrapper">
							<div id="performance-portal"></div>
						</div>
					</details>
				</Container>
			) }

			{ isStagingEnabled && (
				<Container
					id="nfd-staging"
					className={ 'nfd-settings-app-wrapper nfd-staging' }
				>
					<details className="nfd-details settings-app-wrapper staging-details">
						<summary>
							<div
								id={ 'staging-header' }
								className={ 'wppcd-app-staging-header' }
							>
								<Title as={ 'h1' } className={ 'nfd-mb-2' }>
									{ __(
										'Staging',
										'wp-plugin-crazy-domains'
									) }
								</Title>
								<Title
									as={ 'h2' }
									className="nfd-font-normal nfd-text-[13px]"
								>
									{ __(
										'A staging site is a duplicate of your live site, offering a secure environment to experiment, test updates, and deploy when ready.',
										'wp-plugin-crazy-domains'
									) }
								</Title>
							</div>
							<span className="nfd-details-icon">
								<ChevronUpIcon />
							</span>
						</summary>
						<div id="nfd-staging-portal-wrapper">
							<div id="staging-portal"></div>
						</div>
					</details>
				</Container>
			) }
		</Page>
	);
};

export default Settings;