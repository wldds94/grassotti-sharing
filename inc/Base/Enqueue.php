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
	public function __construct()
	{
		parent::__construct();
	}

	/**
	 * Register the Wordpress core Hooks 
	 * @since   1.0.0
	 * 
	 * @return
	 */
	public function register() {
		if( $this->isInAdminPages() ) { // Se dovessi avere più hooks altrimenti potevo usarlo nella funzione -> admin_enqueue;
			add_action( 'admin_enqueue_scripts', array( $this, 'enqueue' ) );
		}

		if ($this->isActivePublic()) {
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueuePublic' ) );
		}
	}
	
	/**
	 * Enqueue All Default Admin scripts
	 * @since   1.0.0
	 * 
	 * @return
	 */
	public function enqueue() { 

		wp_enqueue_script( 'wlninja_graxsh_admin_script', $this->plugin_url . 'dist/js/admin/index.js', '', '', true );	

		// Localize the keys of the buttons for catch the error in "button_id" input of the form in admin-scripts - Don't touch
		wp_localize_script( 'wlninja_graxsh_admin_script', 'wlninja_graxsh_admin_vars', array(
				'author'      => 'Walter Laidelli',
				'site_url'    => $this->site_url,
				'ajax_url'    => admin_url( 'admin-ajax.php' ),
				'graxsh_plugin_url' => $this->plugin_url,
				'wl_nonce'    => wp_create_nonce( $this->admin_graxsh_nonce ), // wp_nonce_field( 'ajax-wlninja-nonce', 'wlninja_validate_button' )
				// 'page_basename' => admin_url( 'admin.php?page=graxsh_admin_index_page' ),
			) 
		);
	}

	/**
	 * Enqueue All Default Public scripts
	 * @since   1.0.0
	 * 
	 * @return
	 */
	public function enqueuePublic()
	{
		wp_enqueue_style( 'wlninja_graxsh_public_style', $this->plugin_url . 'dist/css/public.css' );
		wp_enqueue_script( 'wlninja_graxsh_public_script', $this->plugin_url . 'dist/js/public/wldds-public.js', '', '', true );

        // Localize the keys of the buttons for catch the error in "button_id" input of the form in admin-scripts - Don't touch
		wp_localize_script( 'wlninja_graxsh_public_script', 'wlninja_graxsh_public_vars', array(
                'author'      => 'Walter Laidelli',
                'site_url'    => $this->site_url,
                // 'ajax_url'    => admin_url( 'admin-ajax.php' ),
                'graxsh_plugin_url' => $this->plugin_url,
                'wl_nonce'    => wp_create_nonce( $this->public_graxsh_nonce ), // wp_nonce_field( 'ajax-wlninja-nonce', 'wlninja_validate_button' )
            ) 
        );
	}

}