<?php
/**
 * Widgets bootstrap file
 *
 * @package WPPluginCrazyDomains
 */

namespace CrazyDomains\Widgets;

use CrazyDomains\Widgets\SitePreview;

require_once CRAZYDOMAINS_PLUGIN_DIR . '/inc/Widgets/SitePreview.php';

/* Start up the Dashboards */
if ( is_admin() ) {
	new SitePreview();
}
