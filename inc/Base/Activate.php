<?php
/**
 * @link              walterlaidelli.com
 * @since             1.0.0
 * @package           Graxsh
 */
namespace Graxsh\Base;

use Graxsh\Base\BaseController;
// use Graxsh\Core\Capability;

class Activate extends BaseController
{
    public function __construct()
    {
        parent::__construct();

        $this->default = array();

        $this->activateOption = get_option( $this->version_option_name );
    }

    /**
	 * Called by Activation Hook
	 * @since   1.0.0
	 * 
	 * @return
	 */
	public function activate() {
		flush_rewrite_rules();

        if( $this->activateOption != $this->version ) {
            update_option( $this->version_option_name, $this->version );

            // Setting Option
            update_option( $this->settings_option_name, $this->default );

            // Activate Public Services Option
            update_option( $this->active_public_option_name, false );
        }
	}
}