import './stylesheet.scss';
import './tailwind.css';

import { Root } from "@newfold/ui-component-library";
import { NewfoldRuntime } from '@newfold-labs/wp-module-runtime';
import AppStore, { AppStoreProvider } from './data/store';
import { useLocation, HashRouter as Router } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import { SnackbarList, Spinner } from '@wordpress/components';
import classnames from 'classnames';
import AppRoutes from './data/routes';
import ErrorCard from './components/errorCard';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { store as noticesStore } from '@wordpress/notices';
import { setActiveSubnav } from './util/helpers';
import { kebabCase, filter } from 'lodash';
import { AppNav } from './components/app-nav';
import { SiteInfoBar } from './components/site-info';
import { NotificationFeed } from 'App/components/notifications';
import { addQueryArgs } from '@wordpress/url';

// component sourced from module
import { default as NewfoldNotifications } from '../../vendor/newfold-labs/wp-module-notifications/assets/js/components/notifications/';
// to pass to notifications module
import apiFetch from '@wordpress/api-fetch';
import { useState } from '@wordpress/element';

const Notices = () => {
	if ('undefined' === typeof noticesStore) {
		return null;
	}
	const notices = useSelect(
		(select) =>
			select(noticesStore)
				.getNotices()
				.filter((notice) => notice.type === 'snackbar'),
		[]
	);
	const { removeNotice } = useDispatch(noticesStore);
	return (
		<SnackbarList
			className="edit-site-notices"
			notices={notices}
			onRemove={removeNotice}
		/>
	);
};

const handlePageLoad = () => {
	const location = useLocation();
	const routeContents = document.querySelector('.wppcd-app-body-inner');
	useEffect(() => {
		setActiveSubnav(location.pathname);
		window.scrollTo(0, 0);
		if (routeContents) {
			routeContents.focus({ preventScroll: true });
		}
	}, [location.pathname]);
};

const AppBody = (props) => {
	const location = useLocation();
	const hashedPath = '#' + location.pathname;
	const { booted, hasError } = useContext(AppStore);

	handlePageLoad();

	return (
		<main
			id="wppcd-app-rendered"
			className={classnames(
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
					classnames,
					filter,
					useState,
					useEffect
				}}
			/>
			<div className="wppcd-app-body">
				<div className="wppcd-app-body-inner">
					<ErrorBoundary FallbackComponent={<ErrorCard />}>
						{hasError && <ErrorCard error={hasError} />}
						<SiteInfoBar />
						{(true === booted && <AppRoutes />) ||
							(!hasError && <Spinner />)}
					</ErrorBoundary>
				</div>
			</div>

			<div className="wppcd-app-snackbar">
				<Notices />
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
						<AppNav />
						<AppBody />
					</div>
				</Router>
			</NotificationFeed>
		</Root>
	</AppStoreProvider>
);

export default App;
