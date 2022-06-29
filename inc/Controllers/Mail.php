<?php
namespace Graxsh\Controllers;

use Graxsh\Base\BaseController;
use Graxsh\Api\Mailer;

class Mail extends BaseController {

    public $subject;
    public $body;
    public $altBody;
    public $replyTo;


    public function __construct()
    {
        $this->subject = 'Mail Website Mail Service';
        $this->body = '';
        $this->altBody = '';
    }
}