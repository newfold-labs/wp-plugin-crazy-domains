import { dispatch } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { NewfoldRuntime } from '@newfold-labs/wp-module-runtime';

let lastNoticeId;
const W_NAV = document.querySelector( '#toplevel_page_crazy-domains .wp-submenu' );
/**
 * Set active nav in wp admin sub pages.
 *
 * @param  path
 */
export const setActiveSubnav = ( path ) => {
	if ( W_NAV ) {
		const W_NAV_LIS = W_NAV.children;
		if ( W_NAV_LIS ) {
			for ( let i = 0; i < W_NAV_LIS.length; i++ ) {
				// get all children li elements
				const link = W_NAV_LIS[ i ].children[ 0 ];
				if ( link ) {
					const href = link.getAttribute( 'href' );
					// check each child a href for match with path
					if (
						href.endsWith( path ) || // match
						( path.includes( '/marketplace/' ) &&
							href.endsWith( 'marketplace' ) ) ||
						( path === '/' && href.endsWith( 'home' ) )
					) {
						// highlight home subnav for root page
						// update li class when match
						W_NAV_LIS[ i ].classList.add( 'current' );
					} else {
						W_NAV_LIS[ i ].classList.remove( 'current' );
					}
					// highlight our home nav for root level access
					const W_HOME_NAV = document.querySelector(
						'.wppcd-nav a[href="#/home"]'
					);
					if ( W_HOME_NAV ) {
						if ( path === '/' || path === '/home' ) {
							W_HOME_NAV.classList.add( 'active' );
						} else {
							W_HOME_NAV.classList.remove( 'active' );
						}
					}
				}
			}
		}
	}
};

/**
 * Wrapper method to dispatch snackbar notice
 *
 * @param  string text text for notice
 * @param  text
 */
export const dispatchUpdateSnackbar = ( text = 'Settings Saved' ) => {
	//clear previous notice so they don't stack up when quickly saving multiple settings
	dispatch( 'core/notices' ).removeNotice( lastNoticeId );

	//make new
	dispatch( 'core/notices' )
		.createNotice( 'info', text, {
			type: 'snackbar',
			isDismissible: true,
		} )
		.then( ( result ) => {
			// save as notice to dismiss later
			lastNoticeId = result.notice.id;
		} );
};

/**
 * Wrapper method for toggling a feature via the features API
 *
 * @param {string}   featureName  the name of the feature
 * @param {Function} thenCallback method to call in promise then
 * @return {Promise} Features API promise with attached then callback
 */
export const featureToggle = async ( featureName, thenCallback ) => {
	if ( true === window.NewfoldFeatures.features[ featureName ] ) {
		return window.NewfoldFeatures.disable( featureName ).then(
			( response ) => {
				thenCallback( response );
			}
		);
	}
	// else
	return window.NewfoldFeatures.enable( featureName ).then( ( response ) => {
		thenCallback( response );
	} );
};

/**
 * Helper to update UI elements as features are enabled/disabled
 *
 * @param {string}  selector    css selector to find the element
 * @param {boolean} enabled     whether the element is now activated/deactivated
 * @param {string}  className   the css class to add/remove - default 'nfd-disabled'
 * @param {boolean} forceReload whether this update requires a forced page reload - default false
 */
export const updateUI = (
	selector,
	enabled = true,
	className = 'nfd-disabled',
	forceReload = false
) => {
	const element = document.querySelector( selector );
	if ( element ) {
		if ( ! enabled ) {
			element.classList.add( className );
		} else {
			element.classList.remove( className );
		}
	}
	if ( forceReload ) {
		window.location.reload();
	}
};

/**
 * Wrapper method to post setting to crazydomains endpoint
 *
 * @param {Object}   data         object of data
 * @param {Function} passError    setter for the error in component
 * @param {Function} thenCallback method to call in promise then
 * @return {Promise} apiFetch promise with attached then and catch callbacks
 */
export const crazydomainsSettingsApiFetch = ( data, passError, thenCallback ) => {
	return apiFetch( {
		// path: 'crazydomains/v1/settings', //  can't use path bacause it breaks on temp domains
		url: NewfoldRuntime.createApiUrl( '/crazy-domains/v1/settings' ),
		method: 'POST',
		data,
	} )
		.then( ( response ) => {
			thenCallback( response );
		} )
		.catch( ( error ) => {
			passError( error );
		} );
};

/**
 * Wrapper method to post request to crazydomains cache endpoint
 *
 * @param {*} data object of data
 * @param passError setter for the error in component
 * @param thenCallback method to call in promise then
 * @return apiFetch promise
 */
export const crazydomainsPurgeCacheApiFetch = ( data, passError, thenCallback ) => {
	return apiFetch( {
		url: window.WPPCD.resturl + '/crazy-domains/v1/caching',
		method: 'DELETE',
		data,
	} )
		.then( ( response ) => {
			thenCallback( response );
		} )
		.catch( ( error ) => {
			passError( error );
		} );
};

/**
 * Coming soon admin bar
 */
export const comingSoonAdminbarToggle = ( comingSoon ) => {
	const comingsoonadminbar = document.getElementById(
		'nfd-site-status-text'
	);
	if ( ! comingsoonadminbar ) {
		return;
	}
	if ( ! comingSoon ) {
		comingsoonadminbar.style.color = "#048200";
		comingsoonadminbar.textContent = "Live";
	} else {
		comingsoonadminbar.style.color = "#E01C1C";
		comingsoonadminbar.textContent = "Coming Soon";
	}
};