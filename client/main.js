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
let photoURI = "";

webcam
  .start()
  .then(() => {
    console.log("webcam started");
  })
  .catch((err) => {
    console.log(err);
  });

btnTakePhoto.addEventListener("click", async () => {
  const picture = webcam.snap();
  photoURI = picture;
});

form.addEventListener("formdata", (e) => {
  const formData = e.formData;
  // Cuando se genera el URI
  formData.append("uri", photoURI);
});
