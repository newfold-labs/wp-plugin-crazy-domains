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
		\add_filter( 'newfold_runtime', array( __CLASS__, 'add_to_runtime' ) );
		\add_action( 'update_option_WPLANG', array( __CLASS__, 'clear_transient_on_language_change' ), 10, 2 );
	}

	/**
	 * Add to runtime
	 *
	 * @param array $sdk - runtime properties from module
	 *
	 * @return array
	 */
	public static function add_to_runtime( $sdk ) {
		return array_merge( $sdk, Data::runtime() );
	}

	/**
	 * Subpages to register with add_submenu_page().
	 * Modules should use `nfd_plugin_subnav` filter to add their own subnav items
	 *
	 * Order or array items determines menu order.
	 *
	 * @return array
	 */
	public static function plugin_subpages() {

		$home     = array(
			'route'    => 'crazy-domains#/home',
			'title'    => __( 'Home', 'wp-plugin-crazy-domains' ),
			'priority' => 1,
		);
		$settings = array(
			'route'    => 'crazy-domains#/settings',
			'title'    => __( 'Settings', 'wp-plugin-crazy-domains' ),
			'priority' => 60,
		);
		$help     = array(
			'route'    => 'crazy-domains#/help',
			'title'    => __( 'Help Resources', 'wp-plugin-crazy-domains' ),
			'priority' => 70,
		);

		// apply filter to add module subnav items
		$subnav = apply_filters(
			'nfd_plugin_subnav', // modules can filter this to add their own subnav items
			array(
				$settings,
				$home,
				$help,
			)
		);

		// sort subnav items by priority
		usort(
			$subnav,
			function ( $a, $b ) {
				if ( $a['priority'] === $b['priority'] ) {
					return 0;
				}
				return ( $a['priority'] < $b['priority'] ? -1 : 1 );
			}
		);

		// return subnav items sorted by priority
		return $subnav;
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

		// Add subpages to menu
		foreach ( self::plugin_subpages() as $subpage ) {
			\add_submenu_page(
				'crazy-domains',
				$subpage['title'],
				$subpage['title'],
				'manage_options',
				$subpage['route'],
				array_key_exists( 'callback', $subpage ) ? $subpage['callback'] : array( __CLASS__, 'render' )
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
		if ( ! function_exists( 'get_plugin_data' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}
		$plugin_data = get_plugin_data( CRAZYDOMAINS_PLUGIN_FILE );

		echo '<!-- Crazy Domains -->' . PHP_EOL;

		if ( version_compare( $wp_version, $plugin_data['RequiresWP'], '>=' ) ) {
			echo '<div id="wppcd-app" class="wppcd wppcd_app"></div>' . PHP_EOL;
		} else {
			// fallback messaging for outdated WordPress
			$appWhenOutdated = CRAZYDOMAINS_PLUGIN_DIR . '/inc/AppWhenOutdated.php';
			if ( file_exists( $appWhenOutdated ) ) {
				include_once $appWhenOutdated;
			}
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
			array_merge( $asset['dependencies'], array( 'newfold-features', 'nfd-runtime' ) ),
			$asset['version'],
			true
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

	/**
	 * Clears a specific transient when the WordPress admin language setting is changed.
	 *
	 * This function hooks into the `update_option_WPLANG` action to detect when
	 * the site language is updated in the WordPress settings. If a change is detected,
	 * it deletes the specified transient to ensure fresh data is retrieved.
	 *
	 * @param string $old_value The previous language setting (e.g., 'en_US').
	 * @param string $new_value The new language setting (e.g., 'fr_FR').
	 */
	public static function clear_transient_on_language_change( $old_value, $new_value ) {
		// Check if the language has actually changed
		if ( $old_value !== $new_value ) {
			// Delete the transients to refresh cached data
			delete_transient( 'newfold_marketplace' );
			delete_transient( 'newfold_notifications' );
			delete_transient( 'newfold_solutions' );
		}
	}
} // END \CrazyDomains\Admin
