/* Use PHP-provided URL to current version's build directory instead of root */
import './webpack-public-path';

import domReady from '@wordpress/dom-ready';
import { createRoot, render } from '@wordpress/element';
import App from './app';

const WP_ADM_PAGE_ROOT_ELEMENT = 'wppcd-app';
const W_ASCI = `Welcome to Crazy Domains!`;
console.log(W_ASCI);

const WPPCDRender = () => {
	const DOM_ELEMENT = document.getElementById(WP_ADM_PAGE_ROOT_ELEMENT);
	if (null !== DOM_ELEMENT) {
		if ('undefined' !== typeof createRoot) {
			// WP 6.2+ only
			createRoot(DOM_ELEMENT).render(<App />);
		} else if ('undefined' !== typeof render) {
			render(<App />, DOM_ELEMENT);
		}
	}
};

domReady(WPPCDRender);
