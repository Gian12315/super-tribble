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
  const uri = req.body?.uri;
  const email = req.body?.email;

  console.log(`email: ${email}`);

  if(uri === undefined) {
    console.log("The uri is undefined");
  }

  const userPic = await getUserPicture({ email: email });

  if (userPic === 0) {
    res.send(400);
    res.end();
  }

  const userPassword = await getUserPassword({ email: email });
  const userId = await getUserId({ email: email });

  const imagePath = saveImage({ uri: uri });

  const profileImagePath = getProfileImageURL({ imageID: userPic });

  const hasMatch = compareFaces({
    photoSource: imagePath,
    photoTarget: profileImagePath,
  });

  if (hasMatch) {
    // Send the data
    res.send({ id: userId, password: userPassword });
  } else {
    /* Login failed */
    res.send(400);
    res.end();
  }
});

router.route("/logintest").post(async (req, res) => {
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
module.exports = router;
