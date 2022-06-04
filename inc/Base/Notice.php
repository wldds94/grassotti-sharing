<?php
/**
 * @link              walterlaidelli.com
 * @since             1.0.0
 * @package           Graxsh
 */
namespace Graxsh\Base;

use Graxsh\Base\BaseController;

class Notice extends BaseController
{
    public $router;

    // private $connector;
	// private $pdo;

    public function __construct() {
        // $this->router = new Routes();

        parent::__construct();
    }

    /**
	 * Register the Wordpress core Hooks 
	 * @since   1.0.0
	 * 
	 * @return
	 */
	public function register() {
		
		// Ajax Requests
		add_action( 'admin_init', array( $this, 'graxsh_admin_notice_init_plugin'), 1 );
        // add_action( 'wp_ajax_no_priv_wlank_route', array( $this, 'ajaxRouter') );
	}

    public function graxsh_admin_notice_init_plugin()
    {
        // check if plugin created uploads folder or not
        // $upload_dir = wp_upload_dir();
        // $graxsh_dir_path = $upload_dir['basedir'] . "/graxsh/files";
        $created_dir = wp_mkdir_p($this->upload_folder_path);
        if(!$created_dir){
            add_action('admin_head', function(){
                echo '<div class="notice notice-warning is-dismissible"><p>Plugin was unable to create directory in uploads. Please create a "graxsh/files" directory/folder under your uploads directory</p></div>';
            });
        }

        // $graxsh_temp_dir_path = $upload_dir['basedir'] . "/graxsh-docs/tmp";
        // $created_temp_dir = wp_mkdir_p($graxsh_temp_dir_path);
        // if(!$created_temp_dir){
        //     add_action('admin_head', function(){
        //         echo '<div class="notice notice-warning is-dismissible"><p>Plugin was unable to create directory in uploads. Please create a "graxsh-docs/tmp" directory/folder under your uploads directory</p></div>';
        //     });
        // }
    }
}