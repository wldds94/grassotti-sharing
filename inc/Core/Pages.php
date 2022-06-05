<?php

namespace Graxsh\Core;

use Graxsh\Api\Settings;

use Graxsh\Callbacks\AdminPagesCallback;
use Graxsh\Base\BaseController;

/**
 * Pages
 * use it to write your admin related methods by tapping the settings api class creating all admin pages.
 */
class Pages extends BaseController
{
	/**
	 * Store a new instance of the Settings API Class
	 * @var class instance
	 */
	public $settings;

	/**
	 * Callback class
	 * @var class instance
	 */
	public $callback;

    public $pages;

	/**
	 * Constructor
	 */
	public function __construct()
	{
		parent::__construct();
		
		$this->settings = new Settings();

		$this->pagesCallback = new AdminPagesCallback();

        $this->pages = array();
	}

	/**
     * register default hooks and actions for WordPress
     * @return
     */
	public function register()
	{
		$this->pages()->register_settings();
	}

	/**
	 * Trigger the register method of the Settings API Class
	 * @return
	 */
	private function register_settings() {
		$this->settings->register();
	}

	/**
	 * Register admin pages and subpages at once
	 * @return $this
	 */
	private function pages()
	{
		$admin_pages = array(
			array(
				'page_title' => 'Graxsh Plugin Admin Page',
				'menu_title' => 'Graxsh Dash',
				'capability' => 'manage_options', // 'manage_fism_office',
				'menu_slug' => $this->admin_slug_index,
				'callback' => array( $this->pagesCallback, 'admin_index' ),
				'icon_url' => 'dashicons-store',
				'position' => 69,
			)
		);

		// $admin_subpages = array(
		// 	array(
		// 		'parent_slug' => 'graxsh_admin_index_page', 
		// 		'page_title' => 'Graxsh Utenze', 
		// 		'menu_title' => 'Registrazioni', 
		// 		'capability' => 'manage_options', 
		// 		'menu_slug' => 'graxsh_admin_core_settings_page', 
		// 		'callback' => array( $this->pagesCallback, 'admin_core_settings' ),
		// 	)
		// );

		// Create multiple Admin menu pages and subpages
		$this->settings->addPages( $admin_pages )->withSubPage( 'Private Sharing Area' ); // ->addSubPages( $admin_subpages );

		return $this;
	}

}