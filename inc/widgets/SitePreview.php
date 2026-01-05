<?php
/**
 * Site Preview Widget.
 *
 * @package WPPluginCrazyDomains
 */

namespace CrazyDomains\Widgets;

/**
 * SitePreview Class
 */
class SitePreview {
	/**
	 * The id of this widget.
	 */
	const ID = 'site_preview_widget';

	/**
	 * Constructor
	 */
	public function __construct() {
		add_action( 'wp_dashboard_setup', array( __CLASS__, 'init' ), 1 );
	}

	/**
	 * Add sitepreview widgets
	 * @return void
	 */
	public static function init() {
		wp_add_dashboard_widget(
			self::ID,                          // Widget slug.
			__( 'Site Preview', 'wp-plugin-crazy-domains' ),
			array( __CLASS__, 'widget_render' ),
			null,
			null,
			'normal',
			'high'
		);

		\add_action( 'admin_enqueue_scripts', array( __CLASS__, 'assets' ) );
	}

	/**
	 * Render the widget
	 */
	public static function widget_render() {
		$view_file = CRAZYDOMAINS_PLUGIN_DIR . '/inc/widgets/views/site-preview.php';
		include $view_file;
	}

	/**
	 * Load scripts/styles needed for this dashboard widget.
	 *
	 * @return void
	 */
	public static function assets() {
		// enqueue the crazydomains-style stylesheet
		// this is registered in Admin.php > assets()
		\wp_enqueue_style( 'crazydomains-style' );
	}
}
