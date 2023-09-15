<?php
header("Conten-Type:application/json");

$method = $_SERVER["REQUEST_METHOD"];

switch($method) {
    case "POST":
        $requestBody = json_decode(file_get_contents('php://input'), true);
        $email = $requestBody["email"];
        $uri = $requestBody["amp;uri"];
        handleLogin($uri, $email);
        break;
}

function handleLogin($uri, $email) {
    echo("Test");
    //exec(/**/);
}