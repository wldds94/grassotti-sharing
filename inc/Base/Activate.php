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
        }
	}
}