import graphicUrl from '../../../../assets/svg/settings.svg';
import { Heading } from '../../components';
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	CardFooter,
	Dashicon,
} from '@wordpress/components';
import { Icon, settings, store } from '@wordpress/icons';

const SettingsSection = () => {
	return (
		<section className="wppcd-section wppcd-section-home-settings">
			<img
				src={ graphicUrl }
				className="section-graphic"
				alt={ __( 'Settings illustration', 'wp-plugin-crazy-domains' ) }
			/>
			<Card size="large" className="wppcd-section-card">
				<CardHeader>
					<Heading level="3">
						{ __( 'Settings and Performance', 'wp-plugin-crazy-domains' ) }
					</Heading>
					<p>
						{ __(
							'Customize & fine-tune your site.',
							'wp-plugin-crazy-domains'
						) }
					</p>
				</CardHeader>
				<CardFooter>
					<div className="wppcd-cardlist-content">
						<Heading level="4">
							<Icon icon={ settings } />{ ' ' }
							{ __( 'Manage Settings', 'wp-plugin-crazy-domains' ) }
						</Heading>
						<p>
							{ __(
								'Adjust auto-updates, comments, backed-up revisions & more.',
								'wp-plugin-crazy-domains'
							) }
						</p>
					</div>
					<Button
						variant="primary"
						href="#/settings"
						icon={ settings }
						className="callout-link-settings"
					>
						{ __( 'Settings', 'wp-plugin-crazy-domains' ) }
					</Button>
				</CardFooter>
				<CardFooter>
					<div className="wppcd-cardlist-content">
						<Heading level="4">
							<Dashicon icon="performance" />{ ' ' }
							{ __( 'Performance', 'wp-plugin-crazy-domains' ) }
						</Heading>
						<p>
							{ __(
								'Strike the balance between fresh updates and fastest delivery.',
								'wp-plugin-crazy-domains'
							) }
						</p>
					</div>
					<Button
						variant="primary"
						href="#/performance"
						icon={ <Dashicon icon="performance" /> }
						className="callout-link-performance"
					>
						{ __( 'Performance', 'wp-plugin-crazy-domains' ) }
					</Button>
				</CardFooter>
				<CardFooter>
					<div className="wppcd-cardlist-content">
						<Heading level="4">
							<Icon icon={ store } />{ ' ' }
							{ __( 'Marketplace', 'wp-plugin-crazy-domains' ) }
						</Heading>
						<p>
							{ __(
								'Add site services, themes or plugins from our marketplace.',
								'wp-plugin-crazy-domains'
							) }
						</p>
					</div>
					<Button
						variant="primary"
						href="#/marketplace"
						icon={ store }
						className="callout-link-marketplace"
					>
						{ __( 'Visit Marketplace', 'wp-plugin-crazy-domains' ) }
					</Button>
				</CardFooter>
			</Card>
		</section>
	);
};

export default SettingsSection;
