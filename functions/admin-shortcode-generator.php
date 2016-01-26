<?php
// File Security Check
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Description: WooThemes shortcode generator.
 * Date Created: 2011-01-21.
 * Author: Based on the work of the Shortcode Ninja plugin by VisualShortcodes.com.
 * Integration and Addons: Matty.
 * Since: 3.5.0
 */
class WooThemes_Shortcode_Generator {
	/**
	 * Constructor function.
	 * @access public
	 * @since  3.5.0
	 * @return void
	 */
	function __construct () {
		// Register the necessary actions on `admin_init`.
		add_action( 'admin_init', array( $this, 'init' ) );

		// wp_ajax_... is only run for logged users.
		add_action( 'wp_ajax_woo_check_url_action', array( $this, 'ajax_action_check_url' ) );
		add_action( 'wp_ajax_woo_shortcodes_nonce', array( $this, 'ajax_action_generate_nonce' ) );
	} // End __construct()

	/**
	 * Initialise the code.
	 * @access public
	 * @since  3.5.0
	 * @return void
	 */
	public function init() {
		global $pagenow;

		if ( ( current_user_can( 'edit_posts' ) || current_user_can( 'edit_pages' ) ) && get_user_option( 'rich_editing' ) == 'true' && ( in_array( $pagenow, array( 'post.php', 'post-new.php', 'page-new.php', 'page.php' ) ) ) )  {

			// Output the markup in the footer.
			add_action( 'admin_footer', array( $this, 'output_dialog_markup' ) );

		  	// Add the tinyMCE buttons and plugins.
			add_filter( 'mce_buttons', array( $this, 'filter_mce_buttons' ) );
			add_filter( 'mce_external_plugins', array( $this, 'filter_mce_external_plugins' ) );

			// Register the colourpicker JavaScript.
			wp_register_script( 'woo-colourpicker', esc_url( plugin_dir_url( __FILE__ ) . 'js/colorpicker.js' ), array( 'jquery' ), '3.6', true ); // Loaded into the footer.
			wp_enqueue_script( 'woo-colourpicker' );

			// Register the colourpicker CSS.
			wp_register_style( 'woo-colourpicker', esc_url( plugin_dir_url( __FILE__ ) . 'css/colorpicker.css' ) );
			wp_enqueue_style( 'woo-colourpicker' );

			wp_register_style( 'woo-shortcode-icon', esc_url( plugin_dir_url( __FILE__ ) . 'css/shortcode-icon.css' ) );
			wp_enqueue_style( 'woo-shortcode-icon' );

			// Register the custom CSS styles.
			wp_register_style( 'woo-shortcode-generator', esc_url( plugin_dir_url( __FILE__ ) . 'css/shortcode-generator.css' ) );
			wp_enqueue_style( 'woo-shortcode-generator' );
		}
	} // End init()

	/**
	 * Add a new button to tinyMCE.
	 * @access public
	 * @since  3.5.0
	 * @return void
	 */
	public function filter_mce_buttons( $buttons ) {
		array_push( $buttons, '|', 'woothemes_shortcodes_button' );

		return $buttons;
	} // End filter_mce_buttons()

	/**
	 * Add functionality to tinyMCE as an external plugin.
	 * @access public
	 * @since  3.5.0
	 * @return void
	 */
	public function filter_mce_external_plugins( $plugins ) {
        global $wp_version;
		$suffix = '';
		if ( '3.9' <= $wp_version ) {
			$suffix = '_39';
		}
        $plugins['WooThemesShortcodes'] = wp_nonce_url( esc_url( $this->framework_url() . 'js/shortcode-generator/editor_plugin' . $suffix . '.js' ), 'wooframework-shortcode-generator' );

        return $plugins;
	} // End filter_mce_external_plugins()

	/**
	 * Return the WooFramework URL.
	 * @access public
	 * @since  3.5.0
	 * @return void
	 */
	public function framework_url() {
		return esc_url( plugin_dir_url( __FILE__ ) );
	} // End framework_url()

	/**
	 * Checks if a given url (via GET or POST) exists. Returns JSON.
	 * NOTE: For users that are not logged in this is not called. The client recieves <code>-1</code> in that case.
	 * @access public
	 * @since  3.5.0
	 * @return void
	 */
	public function ajax_action_check_url() {
		$hadError = true;

		$url = isset( $_REQUEST['url'] ) ? $_REQUEST['url'] : '';

		if ( strlen( $url ) > 0  && function_exists( 'get_headers' ) ) {
			$url = esc_url( $url );
			$file_headers = @get_headers( $url );
			$exists       = $file_headers && $file_headers[0] != 'HTTP/1.1 404 Not Found';
			$hadError     = false;
		}

		echo '{ "exists": '. ($exists ? '1' : '0') . ($hadError ? ', "error" : 1 ' : '') . ' }';

		die();
	} // End ajax_action_check_url()

	/**
	 * Generate a nonce.
	 * NOTE: For users that are not logged in this is not called. The client recieves <code>-1</code> in that case.
	 * @access public
	 * @since  3.5.0
	 * @return void
	 */
	public function ajax_action_generate_nonce() {
		echo wp_create_nonce( 'wooframework-shortcode-generator' );
		die();
	} // End ajax_action_generate_nonce()

	/**
	 * Output the HTML markup for the dialog box.
	 * @access public
	 * @since  6.0.0
	 * @return void
	 */
	public function output_dialog_markup () {
		$woo_framework_url = $this->framework_url();
		
?>
<div id="woo-dialog" style="display: none;">


<div id="woo-options-buttons" class="clear">
	<div class="alignleft">

	    <input type="button" id="woo-btn-cancel" class="button" name="cancel" value="Cancel" accesskey="C" />

	</div>
	<div class="alignright">
	    <input type="button" id="woo-btn-insert" class="button-primary" name="insert" value="Insert" accesskey="I" />
	</div>
	<div class="clear"></div><!--/.clear-->
</div><!--/#woo-options-buttons .clear-->

<div id="woo-options" class="alignleft">
    <h3><?php echo __( 'Customize the Shortcode', 'woothemes' ); ?></h3>

	<table id="woo-options-table">
	</table>

</div>
<div class="clear"></div>


<script type="text/javascript" src="<?php echo esc_url( $woo_framework_url . 'js/shortcode-generator/js/column-control.js' ); ?>"></script>
<script type="text/javascript" src="<?php echo esc_url( $woo_framework_url . 'js/shortcode-generator/js/tab-control.js' ); ?>"></script>


<script type="text/javascript" src="<?php echo esc_url( $woo_framework_url . 'js/shortcode-generator/js/dialog-js.php' ); ?>"></script>
</div>
<?php
	} // End output_dialog_markup()
	
} // End Class

$woo_shortcode_generator = new WooThemes_Shortcode_Generator();
?>
