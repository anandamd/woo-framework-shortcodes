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
		
		protected $functions_path;		
		
		public function __construct() {
			
			add_action( 'wp_head', array( $this, 'wfs_wp_head' ), 10 );			

			$this->functions_path = plugin_dir_path( __FILE__ ) . 'functions/';			
			require_once ( $this->functions_path . 'admin-shortcodes.php' );	// Woo Shortcodes
			
			// Load certain files only in the WordPress admin.
			if ( is_admin() ) {
				require_once( $this->functions_path . 'admin-shortcode-generator.php' ); 	    // Framework Shortcode generator // 2011-01-21.
			}
		}

		public function wfs_wp_head() {
					
			if ( function_exists( 'woo_shortcode_stylesheet' ) ) 
				woo_shortcode_stylesheet();
				
		} // End wfs_wp_head()	
		
	} //end class
	
	new WF_Shortcodes();
}
