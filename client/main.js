const webcamElement = document.getElementById("webcam");
const canvasElement = document.getElementById("canvas");
const snapSoundElement = document.getElementById("snapSound");
const btnTakePhoto = document.getElementById("takePhoto");
const btnSendForm = document.getElementById("sendForm");
const form = document.getElementById("form");
const webcam = new Webcam(
  webcamElement,
  "user",
  canvasElement,
  snapSoundElement
);
var photoURI = "";
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

btnTakePhoto.addEventListener("click", async () => {
  // Disabled for debuggin
  const picture = webcam.snap();
});

form.addEventListener("formdata", (e) => {
    const formData = e.formData;

    // Cuando se genera el URI
    formData.append("uri", photoURI);
});

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
