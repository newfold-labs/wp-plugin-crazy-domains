<?php
/**
 * Handle updates for version 2.3.5
 *
 * AUTO_INCREMENT fix for the options table.
 *
 * @package WPPluginCrazyDomains
 */

use CrazyDomains\AutoIncrement;

require_once __DIR__ . '/../AutoIncrement.php';

global $wpdb;

( new AutoIncrement( $wpdb ) )
	->fix_auto_increment( 'options', 'option_id' );
