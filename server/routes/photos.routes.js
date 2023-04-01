const { Router } = require("express");
const { saveImage } = require("../services/uriHandler.js");
const {
  getUserPicture,
  getUserPassword,
  getUserId,
} = require("../services/querys.js");
const http = require("http");
const router = Router();

router.route("/login").get(async (req, res) => {
    console.log("Hola");
})

router.route("/login").post(async (req, res) => {
    console.log("we got here");
  const uri = "foo";
  // const uri = req.body?.uri;
  const email = req.body?.email;
    console.log(email);
  // IMPORTANTE: Sí no cambias el nombre de cada imágen que se va a guardar, entonces esta se va a sobreescribir
  // saveImage({ uri: uri, path: './test.png' });
  const userPic = await getUserPicture({ email: email });
  const userPassword = await getUserPassword({ email: email });
  const userId = await getUserId({ email: email });
  // const body = {
  //   pic: userPic,
  //   password: userPassword,
  //   id: userId,
  // };
  const body = "id="+userId+"&password="+userPassword;

    console.log(body);

  // Correlation between photos up to 80%
  if (true) {
    // Make an http petititon to Moodle
    const requestOptions = {
        hostname: "localhost",
      port: 80,
      path: "/moodle/login/index.php",
      method: "POST",
        headers: {
'Content-Type' : "application/x-www-form-urlencoded",
"Connection": "keep-alive"
        },
    };

      console.log("We are hre");

    const externalRequest = http.request(requestOptions, (externalResponse) => {
        // console.log("Este mensaje se debería imprimir sí la petición a Moodle es exitosa");
        // res.redirect("http://localhost/moodle/login/index.php");
      externalResponse.on("end", () => {
        console.log("Este mensaje se debería imprimir sí la petición a Moodle es exitosa");
      });
    });

    externalRequest.write(body);

    externalRequest.end();

    res.redirect("http://localhost/moodle/login/index.php");
  } else {
    /* Login failed */
    res.end();
  }
});
router
  .route("/test")
  .get((req, res) => {
    res.send("Test");
  })
  .post((req, res) => {
    console.log(req.body);
    res.send("Ok");
  });
module.exports = router;
