<?php
/**
 * Register AdminBar help button.
 *
 * @package WPPluginCrazyDomains
 */

namespace CrazyDomains;

/**
 * \CrazyDomains\AdminBar
 */
class AdminBar {

	/**
	 * Initialize WP admin bar customizations.
	 */
	public static function init() {
		add_action( 'wp_before_admin_bar_render', array( __CLASS__, 'on_before_admin_bar_render' ) );
	}

	/**
	 * Customize the WP admin bar.
	 */
	public static function on_before_admin_bar_render() {
		/**
		 * Reference to the global WordPress admin bar instance.
		 *
		 * @var \WP_Admin_Bar
		 */
		global $wp_admin_bar;
		$wp_admin_bar->add_menu(
			array(
				'id'    => 'crazydomains-support',
				'title' => __( 'Need help?', 'wp-plugin-crazy-domains' ),
				'href'  => apply_filters( 'nfd_build_url', admin_url( 'admin.php?page=crazy-domains#/help' ) ),
				'meta'  => array(
					'title' => esc_attr__( 'We\'re here for you!', 'wp-plugin-crazy-domains' ),
				),
			)
		);
	}
}
