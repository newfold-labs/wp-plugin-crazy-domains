<?php
/**
 * Register Admin page and features.
 *
 * @package WPPluginCrazyDomains
 */

namespace CrazyDomains;

/**
 * \CrazyDomains\Admin
 */
final class Admin {

	/**
	 * Register functionality using WordPress Actions.
	 */
	public function __construct() {
		/* Add Page to WordPress Admin Menu. */
		\add_action( 'admin_menu', array( __CLASS__, 'page' ) );
		/* Load Page Scripts & Styles. */
		\add_action( 'load-toplevel_page_crazy-domains', array( __CLASS__, 'assets' ) );
		/* Add Links to WordPress Plugins list item. */
		\add_filter( 'plugin_action_links_wp-plugin-crazy-domains/wp-plugin-crazy-domains.php', array( __CLASS__, 'actions' ) );
		/* Add inline style to hide subnav link */
		\add_action( 'admin_head', array( __CLASS__, 'admin_nav_style' ) );

		if ( isset( $_GET['page'] ) && strpos( filter_input( INPUT_GET, 'page', FILTER_SANITIZE_STRING ), 'crazy-domains' ) >= 0 ) { // phpcs:ignore
			\add_action( 'admin_footer_text', array( __CLASS__, 'add_brand_to_admin_footer' ) );
		}
	}

	/**
	 * Subpages to register with add_submenu_page().
	 *
	 * Order or array items determines menu order.
	 *
	 * @return array
	 */
	public static function subpages() {
		return array(
			'crazy-domains#/home'        => __( 'Home', 'wp-plugin-crazy-domains' ),
			'crazy-domains#/marketplace' => __( 'Marketplace', 'wp-plugin-crazy-domains' ),
			'crazy-domains#/performance' => __( 'Performance', 'wp-plugin-crazy-domains' ),
			'crazy-domains#/settings'    => __( 'Settings', 'wp-plugin-crazy-domains' ),
			'crazy-domains#/help'        => __( 'Help', 'wp-plugin-crazy-domains' ),
		);
	}

	/**
	 * Add inline script to admin screens
	 *  - hide extra link in subnav
	 */
	public static function admin_nav_style() {
		echo '<style>';
		echo 'li#toplevel_page_crazy-domains a.toplevel_page_crazy-domains div.wp-menu-image.svg { transition: fill 0.15s; background-size: 24px auto !important; }';
		echo 'ul#adminmenu a.toplevel_page_crazy-domains.wp-has-current-submenu:after, ul#adminmenu>li#toplevel_page_crazy-domains.current>a.current:after { border-right-color: #fff !important; }';
		echo 'li#toplevel_page_crazy-domains > ul > li.wp-first-item { display: none !important; }';
		echo '#wp-toolbar #wp-admin-bar-crazydomains-coming_soon .ab-item { padding: 0; }';
		echo '</style>';
	}

	/**
	 * Add WordPress Page to Appearance submenu.
	 *
	 * @return void
	 */
	public static function page() {
		$crazydomainscom = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDI0IDI0Ij4KICA8cGF0aCBmaWxsPSIjZmZmIiBkPSJNMjEuMzQgNy41NGMtLjY0LS40LTEuNDktLjYtMi41My0uNmgtNC40NWwtMy43IDEyaDQuMzdhOC40IDguNCAwIDAgMCAyLjk0LS41NSA4LjIgOC4yIDAgMCAwIDQuMjEtMy44N2MuNDctLjg4LjctMS44Ni44LTIuOTQuMTEtLjg3IDAtMS42OC0uMy0yLjM2YTIuOTEgMi45MSAwIDAgMC0xLjM0LTEuNjhabS0xLjY1IDQuNTJjLS4wNC41NC0uMiAxLjA0LS4zOCAxLjU1YTQuMjcgNC4yNyAwIDAgMS0xLjkyIDIuMTVjLS40My4yLS44Ny4zNC0xLjM4LjM0aC0xLjI1bDIuMDMtNi40N0gxOGMuNDQgMCAuNzguMSAxLjA0LjMuMy4yLjQ4LjQ3LjYxLjg1LjA0LjM3LjA3LjguMDQgMS4yOFpNNS45IDE0LjJoLS4xNGMtLjQ3IDAtLjg3LS4xNy0xLjEtLjQ3LS41NS0uNy0uMzEtMS45OS0uMTQtMi43LjEtLjMzLjk0LTMuMjMgMi45My0zLjQ3LjI3LS4wMy40Ny4wNC42LjIuMi4yNy4yOC43OC4xNCAxLjUybDMuMDMtLjRjLjM0LTEuMTguMjQtMi4xMy0uMjYtMi44LS43OC0xLjA1LTIuMjYtMS4xNS0yLjg3LTEuMTUtLjE3IDAtLjM0IDAtLjUuMDQtMy4yLjMzLTYgMy4xMy02LjYxIDYuNjdhNC41NyA0LjU3IDAgMCAwIC44NyAzLjg0IDQuMzUgNC4zNSAwIDAgMCAzLjQgMS40OWMuMjQgMCAuNDgtLjA0LjcyLS4wNCAyLjgtLjMzIDQuNDUtMS42OCA1LjE1LTQuMTFMOCAxMi42NWMtLjE0LjUtLjcgMS40NS0yLjEgMS41NVoiLz4KPC9zdmc+';

		\add_menu_page(
			__( 'Crazy Domains', 'wp-plugin-crazy-domains' ),
			__( 'Crazy Domains', 'wp-plugin-crazy-domains' ),
			'manage_options',
			'crazy-domains',
			array( __CLASS__, 'render' ),
			$crazydomainscom,
			0
		);

		foreach ( self::subpages() as $route => $title ) {
			\add_submenu_page(
				'crazy-domains',
				$title,
				$title,
				'manage_options',
				$route,
				array( __CLASS__, 'render' )
			);
		}
	}

	/**
	 * Render DOM element for React to load onto.
	 *
	 * @return void
	 */
	public static function render() {
		global $wp_version;

		echo '<!-- Crazy Domains -->' . PHP_EOL;

		if ( version_compare( $wp_version, '5.4', '>=' ) ) {
			echo '<div id="wppcd-app" class="wppcd wppcd_app"></div>' . PHP_EOL;
		} else {
			// fallback messaging for WordPress older than 5.4
			echo '<div id="wppcd-app" class="wppcd wppcd_app">' . PHP_EOL;
			echo '<header class="wppcd-header" style="min-height: 90px; padding: 1rem; margin-bottom: 1.5rem;"><div class="wppcd-header-inner"><div class="wppcd-logo-wrap">' . PHP_EOL;
			echo '<img src="' . esc_url( CRAZYDOMAINS_PLUGIN_URL . 'assets/svg/crazydomains-logo.svg' ) . '" alt="Crazy Domains logo" />' . PHP_EOL;
			echo '</div></div></header>' . PHP_EOL;
			echo '<div class="wrap">' . PHP_EOL;
			echo '<div class="card" style="margin-left: 20px;"><h2 class="title">' . esc_html__( 'Please update to a newer WordPress version.', 'wp-plugin-crazy-domains' ) . '</h2>' . PHP_EOL;
			echo '<p>' . esc_html__( 'There are new WordPress components which this plugin requires in order to render the interface.', 'wp-plugin-crazy-domains' ) . '</p>' . PHP_EOL;
			echo '<p><a href="' . esc_url( admin_url( 'update-core.php' ) ) . '" class="button component-button is-primary button-primary" variant="primary">' . esc_html__( 'Please update now', 'wp-plugin-crazy-domains' ) . '</a></p>' . PHP_EOL;
			echo '</div></div></div>' . PHP_EOL;
		}

		echo '<!-- /Crazy Domains -->' . PHP_EOL;
	}

	/**
	 * Load Page Scripts & Styles.
	 *
	 * @return void
	 */
	public static function assets() {
		$asset_file = CRAZYDOMAINS_BUILD_DIR . '/index.asset.php';

		if ( is_readable( $asset_file ) ) {
			$asset = include_once $asset_file;
		} else {
			return;
		}

		\wp_register_script(
			'crazydomains-script',
			CRAZYDOMAINS_BUILD_URL . '/index.js',
			array_merge( $asset['dependencies'] ),
			$asset['version'],
			true
		);

		include CRAZYDOMAINS_PLUGIN_DIR . '/inc/Data.php';
		\wp_add_inline_script(
			'crazydomains-script',
			'var WPPCD =' . \wp_json_encode( Data::runtime() ) . ';',
			'before'
		);

		\wp_register_style(
			'crazydomains-style',
			CRAZYDOMAINS_BUILD_URL . '/index.css',
			array( 'wp-components' ),
			$asset['version']
		);

		$screen = get_current_screen();
		if ( false !== strpos( $screen->id, 'crazy-domains' ) ) {
			\wp_enqueue_script( 'crazydomains-script' );
			\wp_enqueue_style( 'crazydomains-style' );
		}
	}

	/**
	 * Add Links to WordPress Plugins list item for Crazy Domains.
	 *
	 * @param  array $actions - array of action links for Plugin row item.
	 * @return array
	 */
	public static function actions( $actions ) {
		return array_merge(
			array(
				'overview' => '<a href="' . \admin_url( 'admin.php?page=crazy-domains#/home' ) . '">' . __( 'Home', 'wp-plugin-crazy-domains' ) . '</a>',
				'settings' => '<a href="' . \admin_url( 'admin.php?page=crazy-domains#/settings' ) . '">' . __( 'Settings', 'wp-plugin-crazy-domains' ) . '</a>',
			),
			$actions
		);
	}

	/**
	 * Filter WordPress Admin Footer Text "Thank you for creating with..."
	 *
	 * @param string $footer_text footer text
	 * @return string
	 */
	public static function add_brand_to_admin_footer( $footer_text ) {
		$footer_text = \sprintf( \__( 'Thank you for creating with <a href="https://wordpress.org/">WordPress</a> and <a href="https://crazydomains.com/about-us">Crazy Domains</a>.', 'wp-plugin-crazy-domains' ) );
		return $footer_text;
	}
} // END \CrazyDomains\Admin
