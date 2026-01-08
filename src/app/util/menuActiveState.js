/**
 * Handle active state for WordPress admin submenu items
 * based on React Router hash-based navigation
 */

if (typeof window !== 'undefined') {
	window.addEventListener('DOMContentLoaded', () => {
		function updateActiveMenuItem() {
			const hash = window.location.hash.replace('#', '') || '/home';
			
			// Remove all current classes from submenu items
			const submenuItems = document.querySelectorAll('#toplevel_page_crazy-domains .wp-submenu li');
			submenuItems.forEach(item => item.classList.remove('current'));
			
			// Map hash to menu item
			const menuMap = {
				'/home': 'crazy-domains#/home',
				'/marketplace': 'crazy-domains#/marketplace',
				'marketplace/services': 'crazy-domains#/marketplace',
				'marketplace/featured': 'crazy-domains#/marketplace',
				'marketplace/ecommerce': 'crazy-domains#/marketplace',
				'marketplace/seo': 'crazy-domains#/marketplace',
				'marketplace/themes': 'crazy-domains#/marketplace',
				'marketplace/security': 'crazy-domains#/marketplace',
				'marketplace/all': 'crazy-domains#/marketplace',
				'/settings': 'crazy-domains#/settings',
				'/settings/performance': 'crazy-domains#/settings',
				'/help': 'crazy-domains#/help'
			};
			
			// Find the matching menu item and add current class
			const menuSlug = menuMap[hash] || menuMap['/home'];
			const targetLink = document.querySelector(`#toplevel_page_crazy-domains .wp-submenu li a[href*="${menuSlug}"]`);
			
			if (targetLink && targetLink.parentElement) {
				targetLink.parentElement.classList.add('current');
			}
		}
		
		// Update on page load
		updateActiveMenuItem();
		
		// Update on hash change (for React Router navigation)
		window.addEventListener('hashchange', updateActiveMenuItem);
		
		// Update when clicking submenu items
		const submenuLinks = document.querySelectorAll('#toplevel_page_crazy-domains .wp-submenu a');
		submenuLinks.forEach(link => {
			link.addEventListener('click', () => {
				setTimeout(updateActiveMenuItem, 100);
			});
		});

		// pushState / replaceState (SPA)
		['pushState', 'replaceState'].forEach(method => {
			const original = history[method];
			history[method] = function () {
				const result = original.apply(this, arguments);
				window.dispatchEvent(new Event('routechange'));
				return result;
			};
		});

		window.addEventListener('routechange', updateActiveMenuItem);
	});
}

