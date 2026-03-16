<?php
/**
 * All data retrieval and saving happens from this file.
 *
 * @package WPPluginCrazyDomains
 */

namespace CrazyDomains;

/**
 * \CrazyDomains\Data
 * This class does not have a constructor to get instantiated, just static methods.
 */
final class Data {

	/**
	 * AI SiteGen brand identifier for Network Solutions family.
	 *
	 * @var string
	 */
	private static $ai_sitegen_brand = 'networksolutions';

	/**
	 * Data loaded onto window.NewfoldRuntime
	 *
	 * @return array
	 */
	public static function runtime() {
		global $nfd_module_container;

		$runtime = array(
			'plugin' => array(
				'url'     => CRAZYDOMAINS_BUILD_URL,
				'version' => CRAZYDOMAINS_PLUGIN_VERSION,
				'assets'  => CRAZYDOMAINS_PLUGIN_URL . 'assets/',
				'brand'   => $nfd_module_container->plugin()->brand,
			),
		);
		return $runtime;
	}

	/**
	 * Get the AI SiteGen brand identifier for Network Solutions family.
	 *
	 * This method is called by the newfold_ai_sitegen_brand filter to determine
	 * which brand identifier to use for AI SiteGen API requests.
	 *
	 * @return string The parent brand identifier to use for AI SiteGen API requests.
	 */
	public static function get_ai_sitegen_brand() {
		return self::$ai_sitegen_brand;
	}
}
