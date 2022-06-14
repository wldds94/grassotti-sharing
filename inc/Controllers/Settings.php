<?php
namespace Graxsh\Controllers;

use Graxsh\Base\BaseController;

class Settings extends BaseController {
    public function __construct() {
        parent::__construct();
    }

    public function saveSettings()
    {
        $res_array = array();
		if ( !isset( $_POST ) || empty($_POST) || !is_user_logged_in() || !wp_verify_nonce( $_POST['wlank_graxsh_nonce'], $this->admin_graxsh_nonce ) ) {
			header( 'HTTP/1.1 400 Empty POST Values' );
			$res_array['error'] = 'error - Could not verify POST values';
			return json_encode($res_array);
			exit;
		}

        $oldSettings = get_option($this->settings_option_name, false) ?: array();

        $resp_check = filter_var(sanitize_text_field( $_POST['response_check'] ), FILTER_VALIDATE_BOOLEAN); // sanitize_text_field( $_POST['response_check'] );
		$resp_email = sanitize_text_field( $_POST['response_email'] );
        $content_check = filter_var(sanitize_text_field( $_POST['content_check'] ), FILTER_VALIDATE_BOOLEAN); // sanitize_text_field( $_POST['content_check'] );
        $resp_content = htmlentities( wpautop($_POST['response_content']) );
        

        $option = array(
            'resp_check'   => $resp_check,
            'response_email'   => $resp_email,
            'content_check'    => $content_check,
            'response_content' => $resp_content,
        );
        update_option( $this->settings_option_name, $option );
        $settings = get_option($this->settings_option_name, false) ?: array();

        return array(
            'control' => true,
            'message' => 'Grax Settings Saved',
            'oldData' => $oldSettings,
            'data'    => $settings,
            'post'    => $_POST,
        );
    }

    public function getSettings()
    {
        $res_array = array();
		if ( !isset( $_POST ) || empty($_POST) || !is_user_logged_in() || !wp_verify_nonce( $_POST['wlank_graxsh_nonce'], $this->admin_graxsh_nonce ) ) {
			header( 'HTTP/1.1 400 Empty POST Values' );
			$res_array['error'] = 'error - Could not verify POST values';
			return json_encode($res_array);
			exit;
		}

        $settings = get_option($this->settings_option_name, false) ?: array();

        return array(
            'control' => true,
            'message' => 'Grax Settings',
            'data'    => $settings,
        );
    }
}