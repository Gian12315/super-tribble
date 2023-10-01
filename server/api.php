<?php
header("Conten-Type:application/json");

$method = $_SERVER["REQUEST_METHOD"];

switch($method) {
    case "POST":
        $requestBody = file_get_contents('php://input');

        list($email, $uri) = explode("&", $requestBody);
        $email = urldecode(explode("=", $email)[1]);
        $uri = urldecode(explode("=", $uri)[1]);

        $str = handleLogin($uri, $email);
        echo(json_encode($str));
        break;
}

function handleLogin($uri, $email) {

    if(!file_exists(getcwd()."/tmp")) {
        mkdir("tmp");
    }

    // Auto-install node_modules the first time that the plugins works
    if(!file_exists(getcwd()."/node_modules")) {
        exec("npm i");
    }

    $path = getcwd()."/faceIdHook.js";
    $uriPath = getcwd()."/tmp/.uri";

    $file = fopen($uriPath,"a");
    file_put_contents($uriPath, $uri);
    $output = null;
    $code = null;
    exec("node ".$path." ".$email, $output, $code);
    if($code != 0) {
        return "Error";
    }else {
        $credentials = array_slice($output, 5, 2);
        // id
        $splittedId = explode(":", $credentials[0]);
        $idTag = trim($splittedId[0]);
        $tmp = trim($splittedId[1]);
        $idValue = str_replace(",", "", $tmp);

        // password
        $splittedPassword = explode(":", $credentials[1]);
        $paswordTag = trim($splittedPassword[0]);
        $tmp = trim($splittedPassword[1]);
        $passwordValue = str_replace("'", "", $tmp);

        return array($idTag => $idValue, $paswordTag => $passwordValue);
    }
}