<?php
namespace Graxsh\Classes;
//Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class Mailer {

    //////////////////////////////////////////////////////////////////////
    // Properties
    //////////////////////////////////////////////////////////////////////
    public $Version;
    public $Mail;
    public $Error;
    // public $SMTPDebug = SMTP::DEBUG_SERVER;
    // public $SMTPHost = 'mail.example.com';
    // public $SMTPPort = 465;
    // public $SMTPTimeout = 300;
    // public $IsSMTP = TRUE;
    // public $IsSMTPAuth = TRUE;
    // public $SMTPSecure = 'ssl';
    // public $SMTPAuthUser = 'noknow';
    // public $SMTPAuthPass = 'noknow_pass';
    public $FromAddress; // = 'noreply@example.com';
    public $FromName; // = 'Service Name';
    public $IsHTML = TRUE;
    public $XMailer = ' ';
    public $Charset = 'UTF-8';    


    //////////////////////////////////////////////////////////////////////
    // Constructor
    //////////////////////////////////////////////////////////////////////
    public function __construct($fromAddress = 'noreply@example.com', $fromName = 'Mail Service') {
        $this->Version = phpversion();
        $this->Mail = new PHPMailer(true);

        $this->FromAddress = $fromAddress;
        $this->FromName = $fromName;
    }


    //////////////////////////////////////////////////////////////////////
    // Send an email.
    //////////////////////////////////////////////////////////////////////
    public function Send(array $to, string $subject, string $body, string $altBody = NULL, object $replyTo = NULL, array $cc = NULL, array $bcc = NULL, array $attachment = NULL): bool {
        try {
            // General
            $this->Mail->CharSet = $this->Charset;
            $this->Mail->isHTML($this->IsHTML);
            $this->Mail->XMailer = $this->XMailer;

            // MAIL FROM
            $this->Mail->setFrom($this->FromAddress, $this->FromName);

            // RCPT TO
            foreach($to as $info) {
                if(gettype($info) === 'object') {
                    if(is_null($info->name)) {
                        $this->Mail->addAddress($info->address);
                    } else {
                        $this->Mail->addAddress($info->address, $info->name);
                    }
                } else {
                    $this->Error = 'The type of the $to is incorrect. The data type expects object.';
                    return FALSE;
                }
            }

            // DATA
            $this->Mail->Subject = $subject;
            $this->Mail->Body = $body;
            if(!is_null($altBody)) {
                $this->Mail->AltBody = $altBody;
            }
            if(!is_null($replyTo)) {
                if(is_null($replyTo->name)) {
                    $this->Mail->addReplyTo($replyTo->address);
                } else {
                    $this->Mail->addReplyTo($replyTo->address, $replyTo->name);
                }
            }
            if(!is_null($cc)) {
                foreach($cc as $info) {
                    if(gettype($info) === 'object') {
                        if(is_null($info->name)) {
                            $this->Mail->addAddress($info->address);
                        } else {
                            $this->Mail->addAddress($info->address, $info->name);
                        }
                    } else {
                        $this->Error = 'The type of the $cc is incorrect. The data type expects object.';
                        return FALSE;
                    }
                }
            }
            if(!is_null($bcc)) {
                foreach($bcc as $info) {
                    if(gettype($info) === 'object') {
                        if(is_null($info->name)) {
                            $this->Mail->addAddress($info->address);
                        } else {
                            $this->Mail->addAddress($info->address, $info->name);
                        }
                    } else {
                        $this->Error = 'The type of the $bcc is incorrect. The data type expects object.';
                        return FALSE;
                    }
                }
            }
            if(!is_null($attachment)) {
                foreach($attachment as $info) {
                    $this->Mail->addAttachment($info->path, $info->name, $info->encoding, $info->type, $info->disposition);
                }
            }
            
            return $this->Mail->send();
        } catch (Exception $e) {
            $this->Error = $e->getMessage();
            return FALSE;
        }
    }


    //////////////////////////////////////////////////////////////////////
    // Generate an address and name.
    //////////////////////////////////////////////////////////////////////
    public function GenAddrName(string $address, string $name = NULL): object {
        $o = new stdClass();
        $o->address = $address;
        if(is_null($name)) {
            $o->name = $name;
        }
        return $o;
    }


    //////////////////////////////////////////////////////////////////////
    // Generate an attachment.
    //////////////////////////////////////////////////////////////////////
    public function GenAttachment(string $path, string $name = '', string $encoding = 'base64', string $type = '', string $disposition = 'attachment'): object {
        $o = new stdClass();
        $o->path = $path;
        $o->name = $name;
        $o->encoding = $encoding;
        $o->type = $type;
        $o->disposition = $disposition;
        return $o;
    }


    //////////////////////////////////////////////////////////////////////
    // Generate a body or an alternative body from specified file.
    //////////////////////////////////////////////////////////////////////
    public function GenBodyFromFile(string $path, array $params = NULL): string {
        ob_start();
        require_once($path);
        $body = ob_get_contents();
        ob_end_clean();
        return $body;
    }


    //////////////////////////////////////////////////////////////////////
    // Check if the OpenSSL library loaded or not.
    //////////////////////////////////////////////////////////////////////
    public function IsLoadedOpenSSL(): bool {
        return extension_loaded('openssl');
    }

}