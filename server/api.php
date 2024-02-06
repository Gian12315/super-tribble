<?php

require_once("./vendor/autoload.php");

header("Conten-Type:application/json");

use Stormwind\FaceAnalyzer;
use Stormwind\QueryHandler;
use Stormwind\ImageHandler;
use Dotenv\Dotenv;

$method = $_SERVER["REQUEST_METHOD"];

switch($method) {
    case "POST":
        $requestBody = file_get_contents('php://input');

        list($email, $uri) = explode("&", $requestBody);
        $email = urldecode(explode("=", $email)[1]);
        $uri = urldecode(explode("=", $uri)[1]);

        $log = fopen("./logs", "w");

        fwrite($log, $requestBody);

        fclose($log);

        $str = handleLogin($uri, $email);
        echo(json_encode($str));
        break;
}

function handleLogin($uri, $email) {

    // Creates a folder to save the images that will be compared
    if(!file_exists(getcwd()."/tmp")) {
        mkdir("tmp");
    }

    // Load enviorment vars
    $dotenv = Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    $queryHandler = new QueryHandler();

    $userPicture = $queryHandler->getUserPicture($email);

    /*The value zero for the user picture in the moodle database is reserved
     for the guest user.

     For more information about the guest user, please see: https://docs.moodle.org/403/en/Guest_role
     */
    if($userPicture === 0) 
    {
        throw new Exception("User picture value can't be zero");
    }

    // Gets user's profile image from the Moodle Fyle System
    ImageHandler::getImageFromURL($userPicture, "profile.png");
    $profileImagePath = "./tmp/profile.png";

    // Converts the uri recived in the HTTP request into an image
    $photoTargetPath = "./tmp/login.png";
    ImageHandler::base64ToImage($uri, $photoTargetPath);

    if(FaceAnalyzer::compareFaces($profileImagePath, $photoTargetPath)) {
        $id = $queryHandler->getUserId($email);
        $password = $queryHandler->getUserPassword($email);
        return array("id" => $id, "password" => $password);
    }else {
        return "Error: Faces don't match";
    }
    
}