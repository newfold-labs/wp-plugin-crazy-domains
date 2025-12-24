/* Use PHP-provided URL to current version's build directory instead of root */
import './webpack-public-path';

// Initialize portal registry before anything else
import './portalRegistry';
import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import App from './app';

const WP_ADM_PAGE_ROOT_ELEMENT = 'wppcd-app';
const W_ASCI = `Welcome to Crazy Domains!`;
console.log(W_ASCI);

const WPPCDRender = () => {
	const DOM_ELEMENT = document.getElementById(WP_ADM_PAGE_ROOT_ELEMENT);
	if (null !== DOM_ELEMENT) {
		createRoot(DOM_ELEMENT).render(<App />);
	}
};

domReady(WPPCDRender);
