import { 
	HomeIcon,
	ShoppingBagIcon,
	AdjustmentsHorizontalIcon,
	BuildingStorefrontIcon,
	QuestionMarkCircleIcon } 
from '@heroicons/react/24/outline';
import { NewfoldRuntime } from '@newfold/wp-module-runtime';
import { getMarketplaceSubnavRoutes } from '@modules/wp-module-marketplace/components/marketplaceSubnav';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home';
import Store from '../pages/ecommerce/page';
import Marketplace from '../pages/marketplace';
import Settings from '../pages/settings';
import Help from '../pages/help';
import Admin from '../pages/admin';
import Staging from '../pages/staging';

const addPartialMatch = ( prefix, path ) =>
	prefix === path ? `${ prefix }/*` : path;

export const AppRoutes = () => {
	return (
		<Routes>
			{ routes.map(
				( page ) =>
					true === page.condition && (
						<Route
							end
							key={ page.name }
							path={ addPartialMatch(
								'/marketplace',
								addPartialMatch( '/store', page.name )
							) }
							element={ <page.Component /> }
						/>
					)
			) }
			<Route path="/" element={ <Home /> } />
			<Route
				path="*"
				element={
					<main style={ { padding: '1rem' } }>
						<p>
							{ __(
								"There's nothing here!",
								'wp-plugin-crazy-domains'
							) }
						</p>
					</main>
				}
			/>
		</Routes>
	);
};

const topRoutePaths = [
	'/home',
	'/store',
	'/marketplace',
	'/settings',
	'/staging',
];
const utilityRoutePaths = [ '/help' ];

export const routes = [
	{
		name: '/home',
		title: __( 'Home', 'wp-plugin-crazy-domains' ),
		Component: Home,
		Icon: HomeIcon,
		condition: true,
	},
	{
		name: '/store',
		title: __('Store', 'wp-plugin-crazy-domains'),
		Component: Store,
		Icon: BuildingStorefrontIcon,
		condition: true,
		subRoutes: [
			{
				name: '/store/products',
				title: __( 'Products & Services', 'wp-plugin-crazy-domains' ),
			},
			NewfoldRuntime.hasCapability( 'hasYithExtended' ) ||
			NewfoldRuntime.hasCapability( 'canAccessGlobalCTB' )
				? {
						name: '/store/sales_discounts',
						title: __( 'Sales & Promotions', 'wp-plugin-crazy-domains' ),
				  }
				: null,
			NewfoldRuntime.isWoo
				? {
						name: '/store/payments',
						title: __( 'Payments', 'wp-plugin-crazy-domains' ),
				  }
				: null,
			{
				name: '/store/details',
				title: __( 'Store Details', 'wp-plugin-crazy-domains' ),
			},
		].filter( Boolean ),
	},
	{
		name: '/marketplace',
		title: __( 'Marketplace', 'wp-plugin-crazy-domains' ),
		Component: Marketplace,
		Icon: ShoppingBagIcon,
		subRoutes: await getMarketplaceSubnavRoutes(),
		condition: true,
	},
	{
		name: '/settings',
		title: __( 'Settings', 'wp-plugin-crazy-domains' ),
		Component: Settings,
		Icon: AdjustmentsHorizontalIcon,
		condition: true,
	},
	{
		name: '/staging',
		title: __( 'Staging', 'wp-plugin-crazy-domains' ),
		Component: Staging,
		condition: true,
	},
	{
		name: '/help',
		title: __( 'Help', 'wp-plugin-crazy-domains' ),
		Component: Help,
		Icon: QuestionMarkCircleIcon,
		condition: true,
	},
	{
		name: '/admin',
		title: __( 'Admin', 'wp-plugin-crazy-domains' ),
		Component: Admin,
		condition: true,
	},
];

export const topRoutes = _filter( routes, ( route ) =>
	topRoutePaths.includes( route.name )
);

export const utilityRoutes = _filter( routes, ( route ) =>
	utilityRoutePaths.includes( route.name )
);

export default AppRoutes;
