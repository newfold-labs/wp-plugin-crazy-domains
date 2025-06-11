import './stylesheet.scss';
import './tailwind.pcss';

import AppStore, { AppStoreProvider } from './data/store';
import { useLocation, HashRouter as Router } from 'react-router-dom';
import { NewfoldRuntime } from '@newfold/wp-module-runtime';
import { SnackbarList, Spinner } from '@wordpress/components';
import AppRoutes from './data/routes';
import ErrorCard from './components/errorCard';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { store as noticesStore } from '@wordpress/notices';
import { kebabCase, filter } from 'lodash';
import { useHandlePageLoad } from './util/hooks';
import { Root } from "@newfold/ui-component-library";
import Logo from './components/app-nav/logo';
import { NotificationFeed } from 'App/components/notifications';

// component sourced from module
import { default as NewfoldNotifications } from '../../vendor/newfold-labs/wp-module-notifications/assets/js/components/notifications/';
// to pass to notifications module
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { useState } from '@wordpress/element';

const Notices = () => {
	const notices = useSelect(
		( select ) =>
			select( noticesStore )
				.getNotices()
				.filter( ( notice ) => notice.type === 'snackbar' ),
		[]
	);
	const { removeNotice } = useDispatch( noticesStore );

	return (
		<SnackbarList
			className="edit-site-notices"
			notices={ notices }
			onRemove={ removeNotice }
		/>
	);
};

const AppBody = (props) => {
	const location = useLocation();
	const hashedPath = '#' + location.pathname;
	const { booted, hasError } = useContext(AppStore);

	useHandlePageLoad();

	return (
		<main
			id="wppcd-app-rendered"
			className={classNames(
				'wpadmin-brand-crazydomains',
				`wppcd-wp-${NewfoldRuntime.wpversion}`,
				`wppcd-page-${kebabCase(location.pathname)}`,
				props.className,
				'nfd-w-full nfd-p-4 min-[783px]:nfd-p-0'
			)}
		>
			<NewfoldNotifications
				constants={{
					context: 'crazy-domains-plugin',
					page: hashedPath
				}}
				methods={{
					apiFetch,
					addQueryArgs,
					filter,
					useState,
					useEffect
				}}
			/>
			<div className="wppcd-app-body">
				<header className="nfd-mb-6">
					<Logo />
				</header>
				<div className="wppcd-app-body-inner">
					<ErrorBoundary FallbackComponent={<ErrorCard />}>
						{hasError && <ErrorCard error={hasError} />}
						{(true === booted && <AppRoutes />) ||
							(!hasError && <Spinner />)}
					</ErrorBoundary>
				</div>
			</div>

			<div className="wppcd-app-snackbar">
			{ 'undefined' !== typeof noticesStore && <Notices /> }
			</div>
		</main>
	);
};

export const App = () => (
	<AppStoreProvider>
		<Root context={{ isRtl: false }}>
			<NotificationFeed>
				<Router>
					<div className="wppcd-app-container min-[783px]:nfd-p-8 min-[783px]:nfd-flex nfd-gap-6 nfd-max-w-full xl:nfd-max-w-screen-xl 2xl:nfd-max-w-screen-2xl nfd-my-0">
						<AppBody />
					</div>
				</Router>
			</NotificationFeed>
		</Root>
	</AppStoreProvider>
);

export default App;
