import { NewfoldRuntime } from '@newfold/wp-module-runtime';
import { dispatch } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';

let lastNoticeId;

/**
 * Wrapper method to dispatch snackbar notice
 *
 * @param {string} text text for notice
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
		url: NewfoldRuntime.createApiUrl( '/crazy-domains/v1/caching' ),
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
	window.NewfoldRuntime.comingSoon.toggleAdminBarSiteStatus( comingSoon );
};