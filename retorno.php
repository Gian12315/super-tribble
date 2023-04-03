<!DOCTYPE html>
<html lang="en">
    <head>
        <title></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="css/style.css" rel="stylesheet">
    </head>
    <body>
        <form method="POST" action="">
            <label for="email">Email: </label>
            <input type="text" name="email" value="">
            <label for="username">Usuario: </label>
            <input type="text" name="id" value="">
            <label for="username">Password: </label>
            <input type="text" name="password" value="">

            <input type="submit" name="submit" value="Enviar">
        </form>
    </body>
</html>
<?php

require(__DIR__. '/../../config.php');

if (!empty($_POST)) {
    global $SESSION;

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, "localhost:8000/logintest");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, array("email" => $_POST['email']));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $result = curl_exec($ch);

    var_dump($result);

    $credentials = json_decode($result, true);

    $SESSION->id = $credentials["id"];
    $SESSION->password = $credentials["password"];

    curl_close($ch);

    header("Location: http://localhost/moodle/login/index.php");
    // die();
}

?>
