<?php
/**
 * Callbacks for "register admin page" Settings API
 *
 * @package Graxsh
 */

namespace Graxsh\Callbacks;

use Graxsh\Base\BaseController;

/**
 * Settings API Callbacks Class
 */
class AdminPagesCallback extends BaseController
{
	public function admin_index() 
	{
		return $this->loadAdminTemplate( '/views/admin/index.php' );
	}

    // public function admin_index_registrations() 
	// {
	// 	return $this->loadAdminTemplate( '/views/admin/users.php' );
	// }

    public function admin_core_settings() 
	{
		return $this->loadAdminTemplate( '/views/admin/settings.php' );
	}

    /**
     * UTILS
     */
    private function loadAdminTemplate( string $path )
    {
        return require_once( $this->plugin_path . $path );
    }

}