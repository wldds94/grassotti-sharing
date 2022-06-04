<?php
/**
 * @link              walterlaidelli.com
 * @since             1.0.0
 * @package           Wlident
 */
namespace Graxsh\Base;

use Graxsh\Base\BaseController;

class Enqueue extends BaseController
{
	/**
	 * Register the Wordpress core Hooks 
	 * @since   1.0.0
	 * 
	 * @return
	 */
	public function register() {
		
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );

		add_action( 'wp_enqueue_scripts', array( $this, 'enqueuePublic' ) );

		// Customize palettes
		// add_action('customize_controls_print_footer_scripts', array( $this, 'customizePaletteIris' ) );
	}

	/*public function customizePaletteIris() { 
	?>
		<script>
			jQuery(document).ready(function($){
				$.wp.wpColorPicker.prototype.options = {
					palettes: ['#d6c4a7', '#000000','#dd3333', '#dd9933','#eeee22', '#81d742', '#ff0000']
				};
			});
		</script>
	<?php
	}*/
	
	/**
	 * Enqueue All Default Admin scripts
	 * @since   1.0.0
	 * 
	 * @return
	 */
	public function enqueue() { 

		// if( $this->isInAdminPages() ) {
		// 	wp_enqueue_script( 'jquery' );

		// 	wp_enqueue_script( 'media-upload' );
		// 	wp_enqueue_media();

		// 	// Bootstrap
		// 	wp_enqueue_style( 'wlident_wlpsa_bootstrap_style', $this->plugin_url . 'dist/library/css/bootstrap.min.css' );
		// 	wp_enqueue_script( 'wlident_wlpsa_bootstrap_script', $this->plugin_url . 'dist/library/js/bootstrap.min.js' );

        //     // DataTables Dependency
		// 	wp_enqueue_style( 'wlninja_wlpsa_datatables_style', $this->plugin_url . 'dist/library/css/jquery.dataTables.min.css' );
		// 	// wp_enqueue_script( 'wlninja_datatables_script', $this->plugin_url . 'dist/library/js/jquery.dataTables.min.js', array( 'jquery' ) );

        //     // Font Awesome Dependencies
		// 	wp_enqueue_style( 'wlninja_wlpsa-load-fa-600', $this->plugin_url . 'dist/library/css/fontawesome.all.min.css' );
	
		// 	// My scripts
		// 	wp_enqueue_style( 'wlninja_wlpsa_admin_style', $this->plugin_url . 'dist/css/admin.css' );
		// 	wp_enqueue_script( 'wlninja_wlpsa_admin_script', $this->plugin_url . 'dist/js/admin.js', array( 'jquery' ) );	

		// 	// Localize the keys of the buttons for catch the error in "button_id" input of the form in admin-scripts - Don't touch
		// 	wp_localize_script( 'wlninja_wlpsa_admin_script', 'wlninja_wlpsa_admin_vars', array(
		// 			'author'      => 'Walter Laidelli',
		// 			'site_url'    => $this->site_url,
		// 			'ajax_url'    => admin_url( 'admin-ajax.php' ),
		// 			'wlpsa_plugin_url' => $this->plugin_url,
		// 			'wl_nonce'    => wp_create_nonce( 'wlank_wlpsa_validate_nonce' ), // wp_nonce_field( 'ajax-wlninja-nonce', 'wlninja_validate_button' )
		// 			'folder_root_id' => get_option( 'wlpsa_root_folder_id' ) ?: 0
		// 		) 
		// 	);
		// }
	}

	/**
	 * Enqueue All Default Public scripts
	 * @since   1.0.0
	 * 
	 * @return
	 */
	public function enqueuePublic()
	{
        parent::__construct();

        // // Dependecies
        // wp_enqueue_script( 'jquery' );

        // // DataTables Dependency
        // // wp_enqueue_style( 'wlninja_datatables_style', $this->plugin_url . 'dist/library/css/jquery.dataTables.min.css' );
        // // wp_enqueue_script( 'wlninja_datatables_script', $this->plugin_url . 'dist/library/js/jquery.dataTables.min.js', array( 'jquery' ) );
        
        // // My scripts
        // wp_enqueue_style( 'wlninja_wlpsa_public_style', $this->plugin_url . 'dist/css/public.css' );
        // wp_enqueue_script( 'wlninja_wlpsa_public_script', $this->plugin_url . 'dist/js/public.js', array( 'jquery' ) );	

        // // Localize the keys of the buttons for catch the error in "button_id" input of the form in admin-scripts - Don't touch
        // wp_localize_script( 'wlninja_wlpsa_public_script', 'wlninja_wlpsa_public_vars', array(
        //         'author'      => 'Walter Laidelli',
        //         'site_url'    => $this->site_url,
        //         'ajax_url'    => admin_url( 'admin-ajax.php' ),
        //         'wlpsa_plugin_url' => $this->plugin_url,
        //         'wl_nonce'    => wp_create_nonce( 'wlank_wlpsa_validate_nonce' ), // wp_nonce_field( 'ajax-wlninja-nonce', 'wlninja_validate_button' )
        //     ) 
        // );			
	}

}