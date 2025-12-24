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

	const location = useLocation();

		useEffect( () => {
		// run when mounts
		const performancePortal =
			document.getElementById( 'performance-portal' );
		if ( performancePortal ) {
			window.NFDPortalRegistry.registerPortal(
				'performance',
				performancePortal
			);
		}

		// run when unmounts
		return () => {
			window.NFDPortalRegistry.unregisterPortal( 'performance' );
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
			'/settings/performance': '.performance-details',
			'/settings/settings': '.settings-details',
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
							className={ 'wppbh-app-settings-header' }
						>
							<Title as={ 'h1' } className={ 'nfd-mb-2' }>
								{ __(
									'General Settings',
									'wp-plugin-bluehost'
								) }
							</Title>
							<Title
								as={ 'h2' }
								className="nfd-font-normal nfd-text-[13px]"
							>
								{ __(
									'Manage common settings for your website',
									'wp-plugin-bluehost'
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
		</Page>
	);
};

export default Settings;