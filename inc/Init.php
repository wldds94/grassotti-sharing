<?php
/**
 * @link              walterlaidelli.com
 * @since             1.0.0
 * @package           Graxsh
 */
namespace Graxsh;

final class Init
{
	/**
	 * Store all the classes inside an array
	 * @since    1.0.0
	 * 
	 * @return array Full list of classes
	 */
	public static function get_services() 
	{
		return [
            Base\Enqueue::class,
			Base\Notice::class,
			Base\AjaxRouting::class,
            Core\Pages::class,
			// Core\Router::class,
		// 	Core\CustomPostType::class,
		// 	Core\PopUp::class,
		// 	// Base\AjaxRouting::class,
		// 	Base\Enqueue::class,
		// 	Base\I18n::class,
		];
	}

	/**
	 * Loop through the classes, initialize them, 
	 * and call the register() method if it exists
	 * @since    1.0.0
	 * 
	 * @return
	 */
	public static function register_services() 
	{
		foreach ( self::get_services() as $class ) {
			$service = self::instantiate( $class );
			if ( method_exists( $service, 'register' ) ) {
				$service->register();
			}
		}
	}

	/**
	 * Initialize the class
	 * @since    1.0.0
	 * 
	 * @param  class $class    class from the services array
	 * @return class instance  new instance of the class
	 */
	private static function instantiate( $class )
	{
		$service = new $class();

		return $service;
	}
}