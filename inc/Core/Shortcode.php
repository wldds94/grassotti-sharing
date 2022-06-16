<?php

namespace Graxsh\Core;

use Graxsh\Base\BaseController;

/**
 * Pages
 * use it to write your admin related methods by tapping the settings api class creating all admin pages.
 */
class Shortcode extends BaseController
{
	/**
	 * Constructor
	 */
	public function __construct()
	{
		parent::__construct();
	}

	/**
     * register default hooks and actions for WordPress
     * @return
     */
	public function register()
	{
		if ($this->isActivePublic()) {
			// React Shortcode
            add_shortcode($this->graxsh_react_template_name, array( $this, 'graxsh_react_starter' ) );

            // HTML TEMPLATE - Rewritable with custom template in theme folder "graxsh/shortcode"
            add_shortcode($this->graxsh_html_template_name, array( $this, 'graxsh_html_starter' ) );
		}
	}

    public function graxsh_react_starter($atts) {
        // $attributes = $this->normalize_shortcode_attribute($atts);

		$html = '<div id="graxsh-public-posts-root"></div>';
			
		return $html;
	}

    public function graxsh_html_starter($atts) {
		$attributes = $this->normalize_shortcode_attribute($atts); //$atts; // 

        $template = isset($attributes['template']) ? $attributes['template'] : '';
        $path = '';

        if ('' !== $template) {
            $path .= trailingslashit( get_stylesheet_directory() ) . 'graxsh/shortcode/' . $template;
        } else {
            $path .= $this->plugin_path . '/views/public/shortcode/html_tmpl.php';
        }

        return $this->loadTemplate($path);
	}

    /**
     * normalize attribute keys, lowercase
     */
    private function normalize_shortcode_attribute($atts) {
        $attributes = array_change_key_case( (array) $atts, CASE_LOWER );
        
        // override default attributes with user attributes
        // $sc_atts = shortcode_atts(
        //     $attributes
        // );

        return $attributes;
	}

    /**
     * Buffering include Templates
     */
    private function loadTemplate($templateFileName, $variables = []){
        extract($variables);
    
        ob_start();

        if (file_exists($templateFileName)) {
            include $templateFileName;
        }
    
        return ob_get_clean();
    }
}