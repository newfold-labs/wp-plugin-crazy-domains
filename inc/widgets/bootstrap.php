<?php
/**
 * Widgets bootstrap file
 *
 * @package WPPluginCrazyDomains
 */

namespace CrazyDomains;

require_once CRAZYDOMAINS_PLUGIN_DIR . '/inc/widgets/SitePreview.php';

/* Start up the Dashboards */
if ( is_admin() ) {
	new SitePreview();
}
