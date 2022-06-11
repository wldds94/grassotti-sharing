<?php
// namespace Graxsh\Core;

// use Graxsh\Base\BaseController;
// use Graxsh\Controllers\Post;

// class Router extends BaseController {

//     private $postController;

//     public function __construct()
//     {
//         parent::__construct();

//         $this->postController = new Post();
//     }

//     public function register()
//     {
//         add_action( 'rest_api_init', array( $this, 'register_routes' ) );
//     }

//     public function register_routes()
//     {
//         register_rest_route( 'graxsh/v1', '/post/save', array(
//             'methods' => 'POST',
//             'callback' => array( &$this->postController, 'savePost' ),
//           ) );
//     }
// }