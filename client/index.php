<!DOCTYPE html>

<?php
// si hubo un post

if (!empty($_POST)) {
    require(__DIR__. '/../../../config.php');
    global $SESSION;

    $ch = curl_init();

    // arreglo asociativo con los valores
    $data = array("email" => $_POST['email']);

    curl_setopt($ch, CURLOPT_URL, "localhost:8000/logintest");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $result = curl_exec($ch);

    if ($credentials = json_decode($result, true)) {
        $SESSION->id = $credentials["id"];
        $SESSION->password = $credentials["password"];
    }

    curl_close($ch);

    header("Location: http://localhost/moodle/login/index.php");
    die();
}

?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="text/javascript" src="https://unpkg.com/webcam-easy/dist/webcam-easy.min.js"></script>
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<body>
    <form action="" method="POST" id="form">
    <input type="text" id="email" name="email">
    <button type="button" id="takePhoto">Tomar foto</button>
    <input type="submit" value="Enviar" id="sendForm">
    </form>

    <video id="webcam" autoplay playsinline width="640" height="480"></video>
    <canvas id="canvas" class="d-none"></canvas>
    <audio id="snapSound" src="audio/snap.wav" preload = "auto"></audio>
    <img src="" alt="" id="userPicture">
    <script src="./main.js"></script>
</body>
</html>
