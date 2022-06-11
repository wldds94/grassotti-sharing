<?php
/**
 * @link              walterlaidelli.com
 * @since             1.0.0
 * @package           Graxsh
 */
namespace Graxsh\Base;

use Graxsh\Base\BaseController;

use Graxsh\Api\Router;
// use Graxsh\Core\Router;

class AjaxRouting extends BaseController
{
    public $router;

    // private $connector;
	// private $pdo;

    public function __construct() {
        parent::__construct();
        // $this->router = new Routes();
    }

    /**
	 * Register the Wordpress core Hooks 
	 * @since   1.0.0
	 * 
	 * @return
	 */
	public function register() {
		
		// Ajax Requests
		add_action( 'wp_ajax_graxsh_route', array( $this, 'ajaxRouter') );
        // add_action( 'wp_ajax_nopriv_graxsh_route', array( $this, 'ajaxRouter') );
	}

    public function ajaxRouter()
    {
        // echo json_encode(
        //     'Api WORKS'
        // );
        // die;
        try {
            $this->router = new Router();
            $routes = $this->router->getRoutes();

            /** Check User Capabilities */
            // TO DO
            
            /** REMEMBER TO REACTIVE */
            check_ajax_referer( $this->admin_graxsh_nonce, 'wlank_graxsh_nonce' );

            if ( !isset( $_POST['route'] ) ) {
                echo json_encode(
                    array(
                        'status' => true,
                        'message' => 'Ajax Called Succesfully !!',
                        'error' => 'Error Nr. 1',
                    )
                );
                die();
                // return;
            }

            $serverMethod = filter_var($_SERVER['REQUEST_METHOD'], FILTER_SANITIZE_STRING);
            if (strtoupper($serverMethod) != 'POST') {
                echo json_encode(
                    array(
                        'status' => true,
                        'message' => 'Ajax Called Succesfully !!',
                        'error' => 'Error Nr. 2',
                    )
                );
                die();
            }

            $post = sanitize_textarea_field($_POST['route']);
            $method = strtoupper($serverMethod);

            $controller = $routes[$post][$method]['controller'];
            $action = $routes[$post][$method]['action'];
            // dd($controller); // dd($action);

            if (isset($controller) && isset($action)) {
                $response = $controller->$action();

                echo json_encode(
                    array(
                        'status' => true,
                        'message' => 'Ajax Called Succesfully !!',
                        'response' => $response,
                    )
                );
                die();
            } 
            
            echo json_encode(
                array(
                    'status' => true,
                    'message' => 'Ajax Called Succesfully !!',
                    'error' => 'Error Nr. 3',
                )
            );
            // else {
            //     $response = 'Error Nr. 3';
            // }

        } catch (\Throwable $th) {
            $errorCatched = 'Database error:' . $th->getMessage() . ' in ' . $th->getFile() . ':' . $th->getLine();

            echo json_encode(
                array(
                    'status' => true,
                    'message' => 'Ajax Called Succesfully !!',
                    'error' => $errorCatched,
                )
            );
        }
        
		die();
        exit;
    }
}