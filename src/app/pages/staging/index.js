import { useEffect } from '@wordpress/element';

/**
 * Staging page component that redirects to the WordPress admin staging page.
 * This component immediately redirects users to the nfd-staging admin page
 * when they access the /staging route in the plugin interface.
 *
 * @return {null} Returns null as no UI is needed during redirect
 */
const Staging = () => {
	useEffect( () => {
		window.location.href = `${ window.NewfoldRuntime.adminUrl }admin.php?page=nfd-staging`;
	}, [] );

	return null; // No UI needed as we're redirecting
};

export default Staging;
