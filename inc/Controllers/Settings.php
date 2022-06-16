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

        $active_public = filter_var(sanitize_text_field( $_POST['response_check'] ), FILTER_VALIDATE_BOOLEAN); 
        $resp_check = filter_var(sanitize_text_field( $_POST['response_check'] ), FILTER_VALIDATE_BOOLEAN); // sanitize_text_field( $_POST['response_check'] );
		$resp_email = sanitize_text_field( $_POST['response_email'] );
        $content_check = filter_var(sanitize_text_field( $_POST['content_check'] ), FILTER_VALIDATE_BOOLEAN); // sanitize_text_field( $_POST['content_check'] );
        $resp_content = htmlentities( wpautop($_POST['response_content']) );
        

        $option = array(
            'active_public'   => $active_public,
            'send_response'   => $resp_check,
            'email_response'   => $resp_email,
            'send_content_custom'    => $content_check,
            'email_content_custom' => $resp_content,
        );
        update_option( $this->settings_option_name, $option );

        // Update Activation Options
        update_option( $this->active_public_option_name, $active_public );

        $settings = get_option($this->settings_option_name, false) ?: array();

        return array(
            'control' => true,
            'message' => 'Grax Settings Saved',
            'oldData' => $oldSettings,
            'data'    => $settings,
            // 'post'    => $_POST,
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

        $settings = $settings_response = get_option($this->settings_option_name, false) ?: array();
        $settings_response['email_content_custom'] = isset($settings_response['email_content_custom']) ? html_entity_decode($settings_response['email_content_custom']) : '';

        return array(
            'control' => true,
            'message' => 'Grax Settings',
            'data'    => $settings_response,
        );
    }
}