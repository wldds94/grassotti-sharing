<?php
namespace Graxsh\Api;

use Graxsh\Base\BaseController;

use Graxsh\Controllers\Post;

/**
 * Pages
 * use it to write your admin related methods by tapping the settings api class creating all admin pages.
 */
class RouterPublic extends BaseController
{
	/**
     * register default hooks and actions for WordPress
     * @return
     */
	public function __construct()
	{
        // code
        // $this->postController = new Post();
	}

    public function getRoutes(): array {
		$this->postController = new Post();
			
		$routes = [
            'api/v1/priv/post/save' => [
                'POST' => [
                    'controller' => &$this->postController,
                    'action' => 'savePostPublic'
                ]
			],
			// 'api/v1/post/list' => [
            //     'POST' => [
            //         'controller' => &$this->postController,
            //         'action' => 'listPost'
            //     ]
			// ],
			// 'api/v1/post/delete' => [
            //     'POST' => [
            //         'controller' => &$this->postController,
            //         'action' => 'deletePost'
            //     ]
			// ],
			// 'api/v1/settings/save' => [
            //     'POST' => [
            //         'controller' => &$this->settingsController,
            //         'action' => 'saveSettings'
            //     ]
			// ],
			// 'api/v1/settings/read' => [
            //     'POST' => [
            //         'controller' => &$this->settingsController,
            //         'action' => 'getSettings'
            //     ]
			// ],
			// 'api/users/remove' => [
			// 	'POST' => [
			// 		'controller' => $userController,
			// 		'action' => 'removeUser'
			// 	]
			// ],
		];
		
		return $routes;
		/*$method = $_SERVER['REQUEST_METHOD'];*/
	}
}