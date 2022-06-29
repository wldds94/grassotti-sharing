<?php
namespace Graxsh\Controllers;

use Graxsh\Base\BaseController;
use Graxsh\Classes\Mailer;

class Post extends BaseController {

    public function __construct() {
        parent::__construct();
    }

    public function savePost()
    {
        $res_array = array();
		if ( !isset( $_POST ) || empty($_POST) || !is_user_logged_in() || !wp_verify_nonce( $_POST['wlank_graxsh_nonce'], $this->admin_graxsh_nonce ) ) {
			header( 'HTTP/1.1 400 Empty POST Values' );
			$res_array['error'] = 'error - Could not verify POST values';
			return json_encode($res_array);
			exit;
		}

        if(!isset($_POST['name']) || !isset($_POST['email']) || !isset($_POST['title']) || !isset($_POST['message'])) {
            $res_array['error'] = 'error - Could not verify POST values';
			return json_encode($res_array);
			exit;
		}

        if(!isset($_FILES['files']) ) {
            $res_array['error'] = 'error - Could not verify FILES values';
			return json_encode($res_array);
			exit;
		}

        $post_id = '';
        if(isset($_POST['id'])) {
            $post_id = sanitize_text_field( $_POST['id'] );
		}

        $date = sanitize_text_field( $_POST['date'] );
        $location = sanitize_text_field( $_POST['location'] );
        $name = sanitize_text_field( $_POST['name'] );
        $email = sanitize_text_field( $_POST['email'] );
        $title = sanitize_text_field( $_POST['title'] );
		$message = htmlentities( wpautop($_POST['message']) );
        $status = sanitize_text_field( $_POST['status'] ); // isset($_POST['status']) ? (absint( sanitize_text_field( $_POST['status'] ) ) === 1 ? 'publish' : 'draft') : 'draft';

        if ('' !== $post_id) {
            $story_post = array(
                'ID'           => $post_id,
                'post_title'     => $title,
                'post_content'   => $message,
                'post_status'    => $status,
                // 'guid'           => $wlpsa_dir_url . '/' . basename( $filename ),
                'post_type'      => $this->cpt_slug,
            );
            $story_post_id = wp_update_post($story_post); // wp_insert_post( $story_post );

            // Delete all childs post
            $this->deleteChildsByPost($post_id);
            $path = $this->upload_folder_path . '/' . $post_id;
            $this->recursiveDelete($path);
        } else {
            $story_post = array(
                'post_title'     => $title,
                'post_content'   => $message,
                'post_status'    => $status,
                // 'guid'           => $wlpsa_dir_url . '/' . basename( $filename ),
                'post_type'      => $this->cpt_slug,
            );
            $story_post_id = wp_insert_post( $story_post );
        }
        
        if (is_wp_error( $story_post_id)) {
            $res_array['error'] = 'error - Could not insert stories Post';
			return json_encode($res_array);
			exit;
        }

        $story_user_meta = array(
            'date' => $date,
            'location' => $location,
            'name' => $name,
            'email' => $email,
        );
        // Save metadata name and username
        update_post_meta($story_post_id, $this->cpt_slug_user_meta, $story_user_meta);

        // return json_encode( $story_post_id );
        // Process File
        $hasfiles = count($_FILES['files']);
        if ($hasfiles) {
            $filesCount = count($_FILES['files']['name']);

            if ($filesCount) {
                // return rest_ensure_response( 'API works' );
                for($i=0; $i < $filesCount; $i++) {
                    $file_name = $_FILES['files']['name'][$i];
                    $file_size = $_FILES['files']['size'][$i];
                    $file_tmp = $_FILES['files']['tmp_name'][$i];
                    $file_type = sanitize_text_field($_FILES['files']['type'][$i]);
                    $file_mime_type = count(explode('/', $file_type)) > 0 ? explode('/', $file_type) : 'undefined';
                    // file extension
                    $file_ext_expl = explode('.', $file_name);
                    $file_ext = sanitize_text_field( strtolower( end($file_ext_expl) ) );

                    // Valid file extensions
                    $extensions = array("txt","pdf","jpeg","png","jpg","svg","ods","odt","xlsx","xls","docx","doc","zip");

                    if(in_array($file_ext,$extensions) === false){
                        $res_array['error'] = 'error - Extension not allowed';
                        // return json_encode($res_array);
                        // exit;
                        continue;
                    } else {
                        $filename = 'file_' . $story_post_id . '_doc_'.time().'.'.$file_ext;
                        // $mime_type = $file_type . '/' . $file_ext;
                        $story_post_attachment = array(
                            'post_mime_type' => $file_mime_type[0] . '/' . $file_ext,
                            'post_title'     => $filename,
                            'post_content'   => '',
                            'post_status'    => 'inherit',
                            'guid'           => $this->upload_folder_path . '/' . $story_post_id . '/' . $story_post_attach_id . '/' . basename( $filename ),
                            'post_type'      => $this->cpt_attachments_slug,
                            'post_parent'    => $story_post_id,
                        );
                        $story_post_attach_id = wp_insert_post( $story_post_attachment );
                        if(is_wp_error($story_post_attach_id)){
                            $post_id_error = $story_post_attach_id->get_error_message();
                            $res_array['error'] = 'error - ' . $post_id_error;
                            // return json_encode($res_array);
                            // exit;
                            continue;
                        }

                        $wlpsa_dir_path = $this->upload_folder_path . '/' . $story_post_id . '/' . $story_post_attach_id;
                        $created_dir = wp_mkdir_p($wlpsa_dir_path);
                        if(!$created_dir){
                            // Remove the post ?? TO DO
                            $res_array['error'] = 'error - Plugin was unable to create directory';
                            // return json_encode($res_array);
                            // exit;
                            continue;
                        }

                        // -----------------
                        $upload_path = str_replace( '/', DIRECTORY_SEPARATOR, $wlpsa_dir_path ) . DIRECTORY_SEPARATOR;
                        $upload_file = move_uploaded_file($file_tmp, $upload_path . $filename);

                        if($upload_file){
                            
                            $wlpsa_attach_data = wp_generate_attachment_metadata( $story_post_attach_id, $wlpsa_dir_path . '/' . $filename);
                            wp_update_attachment_metadata( $story_post_attach_id, $wlpsa_attach_data );

                            if ( is_wp_error( $wlpsa_attach_data ) ) {
                                $res_array['error'] = "Error generating the details for your document! Please try later or contact us";
                            } else {
                                $story_post_attach_meta = array();

                                $story_post_attach_meta['url'] = $this->upload_url_path . '/' . $story_post_id . '/' . $story_post_attach_id . '/' . $filename;

                                $blob_path = $this->upload_folder_path . '/' . $story_post_id . '/' . $story_post_attach_id . '/' . $filename;
                                $blob = 'data:' . $story_post_attachment['post_mime_type'] . ';base64,' . base64_encode(fread(fopen($blob_path, "r"), filesize($blob_path)));
                                $story_post_attach_meta['blob'] = $blob;
                                $story_post_attach_meta['size'] = $file_size;
                                $doc_file_time = filemtime(  $upload_path . $filename );
                                $story_post_attach_meta['edited'] = date( "M j Y g:i A", $doc_file_time );

                                update_post_meta($story_post_attach_id, $this->cpt_attachments_meta_name, $story_post_attach_meta);
                            }
                        } else{
                            // return $res_array['error'] = __("Error uploading the photo! Please try later.", "user-private-files");
                            // exit;
                            continue;
                        }
                        // return array(
                        //     'control' => true,
                        //     'message' => 'File Uploaded!!',
                        // );

                        // exit;
                    }
                }

                return array(
                    'control' => true,
                    'message' => 'File Uploaded!!',
                );
            }
        }

        // $response = new \WP_REST_Response($data);
        // $response->set_status(200);

        // return $data;
        // return $_POST;
        // return rest_ensure_response( 'API works' );
    }

    public function listPost()
    {
        $res_array = array();
		if ( !isset( $_POST ) || empty($_POST) || !is_user_logged_in() || !wp_verify_nonce( $_POST['wlank_graxsh_nonce'], $this->admin_graxsh_nonce ) ) {
			header( 'HTTP/1.1 400 Empty POST Values' );
			$res_array['error'] = 'error - Could not verify POST values';
			return json_encode($res_array);
			exit;
		}

        // $all_post_ids = array();
        // $the_query = new \WP_Query( array( 'post_type' => $this->cpt_slug, 'posts_per_page' => -1 ) ); 
        // if ( $the_query->have_posts() ) {
        //     while ( $the_query->have_posts() ) {
        //         $the_query->the_post();
        //         $all_post_ids[] = get_the_ID();
        //     }
        // }
        // wp_reset_query();

        // $result = array();
 
        // foreach($all_post_ids as $post_id) {
        //     // $result[$post_id] = $this->prepareSinglePostData($post_id);
        //     array_push($result, $this->prepareSinglePostData($post_id));
        // }
        $result = $this->getPostData();
        
        return array(
            'control' => true,
            'message' => 'Post Stories',
            'data'    => $result,
            // 'ids'     => $all_post_ids
        );
    }

    /** Deleting */
    public function deletePost()
    {
        $res_array = array();
		if ( !isset( $_POST ) || empty($_POST) || !is_user_logged_in() || !wp_verify_nonce( $_POST['wlank_graxsh_nonce'], $this->admin_graxsh_nonce ) ) {
			header( 'HTTP/1.1 400 Empty POST Values' );
			$res_array['error'] = 'error - Could not verify POST values';
			return json_encode($res_array);
			exit;
		}

        if (!isset($_POST['post_id']) || empty($_POST['post_id'])) { 
            $res_array['error'] = 'error - Could not verify POST ID values';
			return $res_array;
			exit;
        }

        $postID = sanitize_text_field( $_POST['post_id'] );

        // $args_child = array(
        //     'posts_per_page' => -1,
        //     'post_parent'    => $postID,
        //     'post_status'    => 'inherit',
        //     'post_type'      => $this->cpt_attachments_slug,
        // );
        // $childs = get_children( $args_child );

        // if (is_array($childs) && count($childs) > 0) {
        //     // Delete all the Children of the Parent Page
        //     foreach($childs as $child){
        //         wp_delete_post($child->ID, true);
        //     }
        // } else {
        //     $res_array['warning'] = 'warning - Empty Childs';
        // }
        $this->deleteChildsByPost($postID);

        $post_deleted = wp_delete_post($postID, true);
        if (!$post_deleted) {
            $res_array['error'] = __("error - Unable to remove this file. Please try again later or contact us.", "graxsh-lang");
        }
        $path = $this->upload_folder_path . '/' . $postID;
        $this->recursiveDelete($path);

        $data = $this->getPostData();

        return array(
            'control' => true,
            'message' => 'Post Stories',
            'data'    => $data,
            'res'     => $res_array,
            // 'childs'  => $childs
            // 'ids'     => $all_post_ids
        );
    }
    /**
     * Delete a file or recursively delete a directory
     *
     * @param string $str Path to file or directory
     */
    function recursiveDelete($str) {
        if (is_file($str)) {
            return @unlink($str);
        }
        elseif (is_dir($str)) {
            $scan = glob(rtrim($str,'/').'/*');
            foreach($scan as $index=>$path) {
                $this->recursiveDelete($path);
            }
            return @rmdir($str);
        }
    }

    /** Delete all childs of post */
    private function deleteChildsByPost($post_id)
    {
        $args_child = array(
            'posts_per_page' => -1,
            'post_parent'    => $post_id,
            'post_status'    => 'inherit',
            'post_type'      => $this->cpt_attachments_slug,
        );
        $childs = get_children( $args_child );

        if (is_array($childs) && count($childs) > 0) {
            // Delete all the Children of the Parent Page
            foreach($childs as $child){
                wp_delete_post($child->ID, true);
            }
        }
    }

    /** HELPERS */
    private function getPostData()
    {
        $all_post_ids = array();
        $the_query = new \WP_Query( array( 'post_type' => $this->cpt_slug, 'posts_per_page' => -1 ) ); 
        if ( $the_query->have_posts() ) {
            while ( $the_query->have_posts() ) {
                $the_query->the_post();
                $all_post_ids[] = get_the_ID();
            }
        }
        wp_reset_query();

        $result = array();
 
        foreach($all_post_ids as $post_id) {
            // $result[$post_id] = $this->prepareSinglePostData($post_id);
            array_push($result, $this->prepareSinglePostData($post_id));
        }

        return $result;
    }

    private function prepareSinglePostData($post_id)
    {
        $aux = array();
        $aux = $post = get_post( $post_id );
        // $post = get_post( $post_id );
        $children = array();

        $aux->post_content = html_entity_decode($post->post_content);

        // User Meta
        $story_user_meta = get_post_meta($aux->ID, $this->cpt_slug_user_meta, true);
        $aux->date = isset($story_user_meta['date']) ? $story_user_meta['date'] : '';
        $aux->location = isset($story_user_meta['location']) ? $story_user_meta['location'] : '';
        $aux->name = isset($story_user_meta['name']) ? $story_user_meta['name'] : '';
        $aux->email = isset($story_user_meta['email']) ? $story_user_meta['email'] : '';

        $args_child = array(
            'posts_per_page' => -1,
            'post_parent'    => $post_id,
            'post_status'    => 'inherit',
            'post_type'      => $this->cpt_attachments_slug,
        );
        $attachments = get_children( $args_child );
 
        if ( $attachments ) {
            foreach ( $attachments as $attachment ) {
                $attach_meta = get_post_meta($attachment->ID, $this->cpt_attachments_meta_name, true);
                $attachment->meta = isset($attach_meta['url']) ? $attach_meta['url'] : ''; // $attach_meta;

                $blob_path = $this->upload_folder_path . '/' . $post_id . '/' . $attachment->ID . '/' . $attachment->post_title;
                $blob = 'data:' . $attachment->post_mime_type . ';base64,' . base64_encode(fread(fopen($blob_path, "r"), filesize($blob_path)));

                $blob_path = $this->upload_folder_path . '/' . $post_id . '/' . $attachment->ID . '/' . $attachment->post_title;
                $blob = 'data:' . $attachment->post_mime_type . ';base64,' . base64_encode(fread(fopen($blob_path, "r"), filesize($blob_path)));
                $attachment->blob = isset($attach_meta['blob']) ? $attach_meta['blob'] : ''; // $blob; //$this->upload_folder_path . '/' . $post_id . '/' . $attachment->ID . '/' . $attachment->post_title;
                array_push($children, $attachment);
            }
        }

        $aux->children = $children;

        return $aux;
    }


    /** PUBLIC **/
    public function savePostPublic()
    {
        $res_array = array();
		// if ( !isset( $_POST ) || empty($_POST) || !wp_verify_nonce( $_POST['wlank_graxsh_pb_nonce'], $this->public_graxsh_nonce ) ) {
		// 	header( 'HTTP/1.1 400 Empty POST Values' );
		// 	$res_array['error'] = 'error - Could not verify POST values';
		// 	return json_encode($res_array);
		// 	exit;
		// }

        // if(!isset($_POST['name']) || !isset($_POST['email']) || !isset($_POST['title']) || !isset($_POST['message'])) {
        //     $res_array['error'] = 'error - Could not verify POST values';
		// 	return json_encode($res_array);
		// 	exit;
		// }

        // if(!isset($_FILES['files']) ) {
        //     $res_array['error'] = 'error - Could not verify FILES values';
		// 	return json_encode($res_array);
		// 	exit;
		// }

        $date = date_format(new \DateTime("now"), 'Y-m-d'); // return array( 'date' => $date );
        $location = sanitize_text_field( $_POST['location'] );
        $name = sanitize_text_field( $_POST['name'] );
        $email = sanitize_text_field( $_POST['email'] );
        $title = sanitize_text_field( $_POST['title'] );
		$message = htmlentities( wpautop($_POST['message']) );
        $status = 'draft';

        $mailer = new Mailer($this->from_address, $this->from_name);
    //     $story_post = array(
    //         'post_title'     => $title,
    //         'post_content'   => $message,
    //         'post_status'    => $status,
    //         // 'guid'           => $wlpsa_dir_url . '/' . basename( $filename ),
    //         'post_type'      => $this->cpt_slug,
    //     );
    //     $story_post_id = wp_insert_post( $story_post );
        
    //     if (is_wp_error( $story_post_id)) {
    //         $res_array['error'] = 'error - Could not insert stories Post';
	// 		return json_encode($res_array);
	// 		exit;
    //     }

    //     $story_user_meta = array(
    //         'date' => $date,
    //         'location' => $location,
    //         'name' => $name,
    //         'email' => $email,
    //     );
    //     // Save metadata name and username
    //     update_post_meta($story_post_id, $this->cpt_slug_user_meta, $story_user_meta);

    //     // Process File
    //     $hasfiles = count($_FILES['files']);
    //     if ($hasfiles) {
    //         $filesCount = count($_FILES['files']['name']);

    //         if ($filesCount) {
    //             // return rest_ensure_response( 'API works' );
    //             for($i=0; $i < $filesCount; $i++) {
    //                 $file_name = $_FILES['files']['name'][$i];
    //                 $file_size = $_FILES['files']['size'][$i];
    //                 $file_tmp = $_FILES['files']['tmp_name'][$i];
    //                 $file_type = sanitize_text_field($_FILES['files']['type'][$i]);
    //                 $file_mime_type = count(explode('/', $file_type)) > 0 ? explode('/', $file_type) : 'undefined';
    //                 // file extension
    //                 $file_ext_expl = explode('.', $file_name);
    //                 $file_ext = sanitize_text_field( strtolower( end($file_ext_expl) ) );

    //                 // Valid file extensions
    //                 $extensions = array("txt","pdf","jpeg","png","jpg","svg","ods","odt","xlsx","xls","docx","doc","zip");

    //                 if(in_array($file_ext,$extensions) === false){
    //                     $res_array['error'] = 'error - Extension not allowed';
    //                     // return json_encode($res_array);
    //                     // exit;
    //                     continue;
    //                 } else {
    //                     $filename = 'file_' . $story_post_id . '_doc_'.time().'.'.$file_ext;
    //                     // $mime_type = $file_type . '/' . $file_ext;
    //                     $story_post_attachment = array(
    //                         'post_mime_type' => $file_mime_type[0] . '/' . $file_ext,
    //                         'post_title'     => $filename,
    //                         'post_content'   => '',
    //                         'post_status'    => 'inherit',
    //                         'guid'           => $this->upload_folder_path . '/' . $story_post_id . '/' . $story_post_attach_id . '/' . basename( $filename ),
    //                         'post_type'      => $this->cpt_attachments_slug,
    //                         'post_parent'    => $story_post_id,
    //                     );
    //                     $story_post_attach_id = wp_insert_post( $story_post_attachment );
    //                     if(is_wp_error($story_post_attach_id)){
    //                         $post_id_error = $story_post_attach_id->get_error_message();
    //                         $res_array['error'] = 'error - ' . $post_id_error;
    //                         // return json_encode($res_array);
    //                         // exit;
    //                         continue;
    //                     }

    //                     $wlpsa_dir_path = $this->upload_folder_path . '/' . $story_post_id . '/' . $story_post_attach_id;
    //                     $created_dir = wp_mkdir_p($wlpsa_dir_path);
    //                     if(!$created_dir){
    //                         // Remove the post ?? TO DO
    //                         $res_array['error'] = 'error - Plugin was unable to create directory';
    //                         // return json_encode($res_array);
    //                         // exit;
    //                         continue;
    //                     }

    //                     // -----------------
    //                     $upload_path = str_replace( '/', DIRECTORY_SEPARATOR, $wlpsa_dir_path ) . DIRECTORY_SEPARATOR;
    //                     $upload_file = move_uploaded_file($file_tmp, $upload_path . $filename);

    //                     if($upload_file){
                            
    //                         $wlpsa_attach_data = wp_generate_attachment_metadata( $story_post_attach_id, $wlpsa_dir_path . '/' . $filename);
    //                         wp_update_attachment_metadata( $story_post_attach_id, $wlpsa_attach_data );

    //                         if ( is_wp_error( $wlpsa_attach_data ) ) {
    //                             $res_array['error'] = "Error generating the details for your document! Please try later or contact us";
    //                         } else {
    //                             $story_post_attach_meta = array();

    //                             $story_post_attach_meta['url'] = $this->upload_url_path . '/' . $story_post_id . '/' . $story_post_attach_id . '/' . $filename;

    //                             $blob_path = $this->upload_folder_path . '/' . $story_post_id . '/' . $story_post_attach_id . '/' . $filename;
    //                             $blob = 'data:' . $story_post_attachment['post_mime_type'] . ';base64,' . base64_encode(fread(fopen($blob_path, "r"), filesize($blob_path)));
    //                             $story_post_attach_meta['blob'] = $blob;
    //                             $story_post_attach_meta['size'] = $file_size;
    //                             $doc_file_time = filemtime(  $upload_path . $filename );
    //                             $story_post_attach_meta['edited'] = date( "M j Y g:i A", $doc_file_time );

    //                             update_post_meta($story_post_attach_id, $this->cpt_attachments_meta_name, $story_post_attach_meta);
    //                         }
    //                     } else{
    //                         continue;
    //                     }
    //                 }
    //             }

    //             return array(
    //                 'control' => true,
    //                 'message' => 'File Uploaded!!',
    //             );
    //         }
    //     } else {
    //         return array(
    //             'control' => true,
    //             'message' => 'I wasn\'t able to Upload File... Something went wrong',
    //         );
    //     }

    }
}