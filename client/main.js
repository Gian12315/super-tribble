const webcamElement = document.getElementById("webcam");
const canvasElement = document.getElementById("canvas");
const snapSoundElement = document.getElementById("snapSound");
const btnTakePhoto = document.getElementById("takePhoto");
const webcam = new Webcam(
  webcamElement,
  "user",
  canvasElement,
  snapSoundElement
);
const url = "http://localhost:3000/login";
const moodleUrl = "http://localhost:80/moodle/login/index.php";

webcam
  .start()
  .then(() => {
    console.log("webcam started");
  })
  .catch((err) => {
    console.log(err);
  });

// btnTakePhoto.addEventListener("click", async () => {
//   // Disabled for debuggin
//   const picture = webcam.snap();
//   const body = {
//     uri: "foo",
//     email: getEmail(),
//   };
//   await login(body);
// });

/**
 * Finds moodle user image by the id and renderizes on the login.
 * @param {number} pictureId
 * @returns
 */
const getUserPicture = (pictureId) => {
  if (!pictureId) {
    return;
  }
  const img = document.getElementById("userPicture");
  img.src = `http://localhost:80/moodle/pluginfile.php/5/user/icon/boost/f1?rev=${pictureId}`;
};

/**
 * Sends the email and the photo uri from the user to the node server        
 * @returns '{pic: pictureOfUser, password: passwordOfUser, id: idOfUser}'
 */
const login = async (body = {}) => {
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify(body),
  });
};

/**
 * Gets the string of the input with the id 'email'.
 * @returns
 */

const getEmail = () => {
  const email = document.getElementById("email");
  return email.value;
};
