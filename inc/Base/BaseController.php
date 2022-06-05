<?php 
/**
 * @link              walterlaidelli.com
 * @since             1.0.0
 * @package           Graxsh
 */
namespace Graxsh\Base;

class BaseController
{
    /**
     * Version auxialiary
     */
	public $version;
    public $version_option_name;

	public $site_url;

	public $plugin_path;

	public $plugin_url;

	public $plugin;

	public $valid_pages;

    /**
     * The folder to Upload the images by stories
     */
    public $upload_folder_path;

	/**
	 * Admin Pages
	 */
	public $admin_slug_index;

	public function __construct() {

		$this->version = GRAXSH_VERSION;
        $this->version_option_name = 'graxsh_version';

		$this->site_url = site_url();
        
		$this->plugin_path = plugin_dir_path( dirname( __FILE__, 2 ) );
		$this->plugin_url = plugin_dir_url( dirname( __FILE__, 2 ) );
		$this->plugin = plugin_basename( dirname( __FILE__, 3 ) ) . '/wlsfcpt.php';

        $this->upload_folder_path = wp_upload_dir()['basedir'] . "/graxsh/files";

		// Pages
		$this->admin_slug_index = 'graxsh_admin_index_page';
		$this->valid_pages = array( $this->admin_slug_index );

    }

	/**
	 * Check is the request on WP backend contain $this->valid_pages
	 * @since    1.0.0
	 * 
	 * @return   bool
	 */
	public function isInAdminPages()
	{
		$page = isset( $_REQUEST[ 'page' ] ) ? sanitize_title( $_REQUEST[ 'page' ] ) : ''; // Recupero la richiesta della pagina
		return in_array( $page, $this->valid_pages ) ? true : false;

	}

}
