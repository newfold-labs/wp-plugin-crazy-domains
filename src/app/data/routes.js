import { 
	HomeIcon,
	ShoppingBagIcon,
	WrenchScrewdriverIcon,
	BoltIcon, 
	AdjustmentsHorizontalIcon,
	BuildingStorefrontIcon,
	QuestionMarkCircleIcon } 
from '@heroicons/react/24/outline';
import { NewfoldRuntime } from "@newfold-labs/wp-module-runtime";
import { getMarketplaceSubnavRoutes } from '../../../vendor/newfold-labs/wp-module-marketplace/components/marketplaceSubnav';
import { Route, Routes } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import Home from '../pages/home';
import Marketplace from '../pages/marketplace';
import Settings from '../pages/settings';
import Performance from '../pages/performance';
import Help from '../pages/help';
import EcomerceStore from '../pages/ecommerce';

export const AppRoutes = () => {
	return (
		<Routes>
			{ routes.map( ( page ) => (
				<Route
					end
					key={ page.name }
					path={
						'/marketplace' === page.name
							? '/marketplace/*'
							: page.name
					}
					element={ <page.Component /> }
				/>
			) ) }
			<Route path="/" element={ <Home /> } />
			<Route
				path="*"
				element={
					<main style={ { padding: '1rem' } }>
						<p>
							{ __( "There's nothing here!", 'wp-plugin-crazy-domains' ) }
						</p>
					</main>
				}
			/>
		</Routes>
	);
};

const topRoutePaths = [
	'/home',
	'/marketplace',
	'/performance',
	'/settings',
];
const utilityRoutePaths = [ '/help' ];

export const routes = [
	{
		name: '/home',
		title: __( 'Home', 'wp-plugin-crazy-domains' ),
		Component: Home,
		Icon: HomeIcon,
	},
	{
		name: '/store',
		title: __('Store', 'wp-plugin-crazydomains'),
		Component: EcomerceStore,
		Icon: BuildingStorefrontIcon,
		subRoutes: [
			{
				name: '/store/products',
				title: __( 'Products', 'wp-plugin-crazydomains' ),
			},
			NewfoldRuntime.hasCapability( 'hasYithExtended' )
			? {
				name: "/store/sales_discounts",
				title: __("Sales & Discounts", "wp-plugin-crazydomains"),
			}
			: null,
			NewfoldRuntime.isWoo
			? {
				name: '/store/payments',
				title: __( 'Payments', 'wp-plugin-bluehost' ),
			}
			: null,
			{
				name: '/store/details',
				title: __( 'Store Details', 'wp-plugin-crazydomains' ),
			}
		].filter(Boolean),
	},
	{
		name: '/marketplace',
		title: __( 'Marketplace', 'wp-plugin-crazydomains' ),
		Component: Marketplace,
		Icon: ShoppingBagIcon,
		subRoutes: await getMarketplaceSubnavRoutes(),
	},
	{
		name: '/performance',
		title: __( 'Performance', 'wp-plugin-crazydomains' ),
		Component: Performance,
		Icon: BoltIcon,
	},
	{
		name: '/settings',
		title: __( 'Settings', 'wp-plugin-crazydomains' ),
		Component: Settings,
		Icon: AdjustmentsHorizontalIcon,
	},
	{
		name: '/help',
		title: __( 'Help', 'wp-plugin-crazydomains' ),
		Component: Help,
		Icon: QuestionMarkCircleIcon,
	},
];

export const topRoutes = _filter( routes, ( route ) =>
	topRoutePaths.includes( route.name )
);

export const utilityRoutes = _filter( routes, ( route ) =>
	utilityRoutePaths.includes( route.name )
);

export default AppRoutes;
