<?php
/**
 * Register Admin page and features.
 *
 * @package WPPluginCrazyDomains
 */

namespace CrazyDomains;

use CrazyDomains\Data;
use function NewfoldLabs\WP\Module\Features\isEnabled;

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
		/* Add runtime for data store */
		\add_filter('newfold_runtime', array( __CLASS__, 'add_to_runtime' ) );
	}

	/**
	 * Add to runtime
	 */
	public static function add_to_runtime( $sdk ) {
		return array_merge( $sdk, Data::runtime() );
	}

	/**
	 * Subpages to register with add_submenu_page().
	 *
	 * Order or array items determines menu order.
	 *
	 * @return array
	 */
	public static function subpages() {
		$home          = array(
			'crazy-domains#/home' => __( 'Home', 'wp-plugin-crazy-domains' ),
		);
		$marketplace   = array(
			'crazy-domains#/marketplace' => __( 'Marketplace', 'wp-plugin-crazy-domains' ),
		);
		// add performance if enabled
		$performance = isEnabled( 'performance' )
		? array(
			'crazy-domains#/performance' => __( 'Performance', 'wp-plugin-crazy-domains' ),
		)
		: array();
		$settings    = array(
			'crazy-domains#/settings' => __( 'Settings', 'wp-plugin-crazy-domains' ),
		);
		$help    = array(
			'crazy-domains#/help' => __( 'Help', 'wp-plugin-crazy-domains' ),
		);

		return array_merge(
			$home,
			$marketplace,
			$performance,
			$settings,
			$help,
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
		$crazydomainscom = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIxLjMzNzEgNy41MzkzM0MyMC42OTY2IDcuMTM0ODMgMTkuODUzOSA2LjkzMjU5IDE4LjgwOSA2LjkzMjU5SDE0LjM1OTZMMTAuNjUxNyAxOC45MzI2SDE1LjAzMzdDMTYuMDc4NyAxOC45MzI2IDE3LjA1NjIgMTguNzMwMyAxNy45NjYzIDE4LjM5MzNDMTguODc2NCAxOC4wMjI1IDE5LjY4NTQgMTcuNTE2OSAyMC40MjcgMTYuODQyN0MyMS4xMzQ4IDE2LjIwMjIgMjEuNzA3OSAxNS4zOTMzIDIyLjE3OTggMTQuNTE2OUMyMi42NTE3IDEzLjY0MDUgMjIuODg3NiAxMi42NjI5IDIyLjk4ODggMTEuNTg0M0MyMy4wODk5IDEwLjcwNzkgMjIuOTg4OCA5Ljg5ODg4IDIyLjY4NTQgOS4yMjQ3MkMyMi40NDk0IDguNDgzMTUgMjIuMDExMiA3Ljk0MzgyIDIxLjMzNzEgNy41MzkzM1pNMTkuNjg1NCAxMi4wNTYyQzE5LjY1MTcgMTIuNTk1NSAxOS40ODMxIDEzLjEwMTEgMTkuMzE0NiAxMy42MDY3QzE5LjExMjQgMTQuMDc4NyAxOC44NDI3IDE0LjU1MDYgMTguNTA1NiAxNC44ODc2QzE4LjE2ODUgMTUuMjU4NCAxNy43OTc4IDE1LjU2MTggMTcuMzkzMyAxNS43NjRDMTYuOTU1MSAxNS45NjYzIDE2LjUxNjkgMTYuMTAxMSAxNi4wMTEyIDE2LjEwMTFIMTQuNzY0TDE2Ljc4NjUgOS42MjkyMkgxOEMxOC40MzgyIDkuNjI5MjIgMTguNzc1MyA5LjczMDM0IDE5LjA0NDkgOS45MzI1OUMxOS4zNDgzIDEwLjEzNDggMTkuNTE2OSAxMC40MDQ1IDE5LjY1MTcgMTAuNzc1M0MxOS42ODU0IDExLjE0NjEgMTkuNzE5MSAxMS41ODQzIDE5LjY4NTQgMTIuMDU2MloiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik01Ljg5ODg4IDE0LjIwMjJDNS44NjUxNyAxNC4yMDIyIDUuNzk3NzYgMTQuMjAyMiA1Ljc2NDA1IDE0LjIwMjJDNS4yOTIxNCAxNC4yMDIyIDQuODg3NjQgMTQuMDMzNyA0LjY1MTY5IDEzLjczMDNDNC4xMTIzNiAxMy4wMjI1IDQuMzQ4MzIgMTEuNzQxNiA0LjUxNjg2IDExLjAzMzdDNC42MTc5OCAxMC42OTY2IDUuNDYwNjggNy43OTc3NiA3LjQ0OTQ0IDcuNTYxOEM3LjcxOTEgNy41MjgwOSA3LjkyMTM1IDcuNTk1NTEgOC4wNTYxOCA3Ljc2NDA1QzguMjU4NDMgOC4wMzM3MSA4LjMyNTg1IDguNTM5MzMgOC4xOTEwMSA5LjI4MDlMMTEuMjI0NyA4Ljg3NjQxQzExLjU2MTggNy42OTY2MyAxMS40NjA3IDYuNzUyODEgMTAuOTU1MSA2LjA3ODY1QzEwLjE3OTggNS4wMzM3MSA4LjY5NjYzIDQuOTMyNTkgOC4wODk4OSA0LjkzMjU5QzcuOTIxMzUgNC45MzI1OSA3Ljc1MjgxIDQuOTMyNTkgNy41ODQyNyA0Ljk2NjI5QzQuMzgyMDMgNS4zMDMzNyAxLjU4NDI3IDguMTAxMTMgMC45Nzc1MzEgMTEuNjQwNUMwLjcwNzg2OCAxMy4xMjM2IDEuMDExMjQgMTQuNDcxOSAxLjg1Mzk0IDE1LjQ4MzFDMi42MjkyMiAxNi40MjcgMy44NzY0MSAxNi45NjYzIDUuMjU4NDMgMTYuOTY2M0M1LjQ5NDM5IDE2Ljk2NjMgNS43MzAzNCAxNi45MzI2IDUuOTY2MyAxNi45MzI2QzguNzY0MDUgMTYuNTk1NSAxMC40MTU3IDE1LjI0NzIgMTEuMTIzNiAxMi44MjAyTDcuOTg4NzcgMTIuNjUxN0M3Ljg1Mzk0IDEzLjE1NzMgNy4yODA5IDE0LjEwMTEgNS44OTg4OCAxNC4yMDIyWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+';

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
			array_merge( $asset['dependencies'], [ 'newfold-features', 'nfd-runtime' ] ),
			$asset['version'],
			true
		);

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

		\add_action( 'admin_footer_text', array( __CLASS__, 'add_brand_to_admin_footer' ) );
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
		$footer_text = \sprintf( \__( 'Thank you for creating with <a href="https://wordpress.org/">WordPress</a> and <a href="https://crazydomains.com/about">Crazy Domains</a>.', 'wp-plugin-crazy-domains' ) );
		return $footer_text;
	}
} // END \CrazyDomains\Admin
