const { Router } = require("express");
const { saveImage } = require("../services/uriHandler.js");
const {
  getUserPicture,
  getUserPassword,
  getUserId,
} = require("../services/querys.js");
const { compareFaces } = require("../services/faceMathcing.js");
const { getProfileImageURL } = require("../services/profileImageFinder.js");
const router = Router();

router.route("/login").post(async (req, res) => {
    // console.log(req.body);
  const uri = req.body['amp;uri'];
  const email = req.body?.email;

  console.log(`email: ${email}`);

  if(uri == undefined) {
    console.log("The uri is undefined");
  }

    console.log(typeof uri);

  const userPic = await getUserPicture({ email: email });

  if (userPic === 0) {
    res.send(400);
    res.end();
  }

  const userPassword = await getUserPassword({ email: email });
  const userId = await getUserId({ email: email });

  const imagePath = await saveImage({ uri: uri });

  const profileImagePath = await getProfileImageURL({ imageID: userPic });

  const hasMatch = await compareFaces({
    photoSource: imagePath,
    photoTarget: profileImagePath,
  });

  if (hasMatch) {
    // Send the data
    console.log("WE GOOOOOOOOOOOT MATCH");
    res.send({ id: userId, password: userPassword });
  } else {
    /* Login failed */
    res.send(400);
    res.end();
  }
  /*const funfunfun = async () => {
  }

  setTimeout(funfunfun, 3000);*/

});

/*router.route("/logintest").post(async (req, res) => {
  var email = req.body?.email;
  email = "giancarlo.cytro@gmail.com";

  console.log(email);

  const userPic = await getUserPicture({ email: email });
  const userPassword = await getUserPassword({ email: email });
  const userId = await getUserId({ email: email });

  const body = "id=" + userId + "&password=" + userPassword;

  res.send({ id: userId, password: userPassword });
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
  */
module.exports = router;