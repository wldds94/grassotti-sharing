<?php
/**
 * @link              walterlaidelli.com
 * @since             1.0.0
 * @package           Graxsh
 */
namespace Graxsh\Base;

use Graxsh\Base\BaseController;

class Deactivate extends BaseController
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
	 * Called by Deactivation Hook
	 * @since   1.0.0
	 * 
	 * @return
	 */
	public function deactivate() {
		flush_rewrite_rules();

		// Remove option - Only stage dev
		delete_option( $this->version_option_name );
		// Setting Option
		delete_option( $this->settings_option_name );
	}
}