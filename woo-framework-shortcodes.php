<?php
if ( ! defined('ABSPATH') ) exit;

/**
* Plugin Name: Woo Framework Shortcodes
* Plugin URI: https://github.com/anandamd/woo-framework-shortcodes
* Description: Easily switch to a non WooThemes theme but retain the framework shortcodes. Use shortcodes from WooFramework in another theme. 
* Author: Anand Shah
* License: GPLv2
* Version: 1.0.0
* */

if ( ! class_exists( 'WF_Shortcodes' ) ) {
	
	class WF_Shortcodes {

		$functions_path = '';
		
		public function __construct() {
			add_action( 'wp_head', array( $this, 'woothemes_wp_head' ), 10 );
			
			$functions_path = plugin_dir_path( __FILE__ ) . 'functions/';
		}
		
		require_once ( $functions_path . 'admin-shortcodes.php' );	// Woo Shortcodes


		if ( ! function_exists( 'woothemes_wp_head' ) ) {
			/**
			 * Output the default WooFramework "head" markup in the "head" section.
			 * @return void
			 */
			public function woothemes_wp_head() {
					
				if ( function_exists( 'woo_shortcode_stylesheet' ) )
					woo_shortcode_stylesheet();
				
			} // End woothemes_wp_head()
		}
		
		// Load certain files only in the WordPress admin.
		if ( is_admin() ) {
			require_once( $functions_path . 'admin-shortcode-generator.php' ); 	    // Framework Shortcode generator // 2011-01-21.
		}
		
	} //end class
	
	new WF_Shortcodes();
}
