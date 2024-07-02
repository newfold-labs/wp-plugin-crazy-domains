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
	 * Data loaded onto window.NewfoldRuntime
	 *
	 * @return array
	 */
	public static function runtime() {
		global $crazydomains_module_container;

		$runtime = array(
			'plugin' => array(
				'url'     => CRAZYDOMAINS_BUILD_URL,
				'version' => CRAZYDOMAINS_PLUGIN_VERSION,
				'assets'  => CRAZYDOMAINS_PLUGIN_URL . 'assets/',
				'brand'   => $crazydomains_module_container->plugin()->brand,
			),
		);
		return $runtime;
	}
}
