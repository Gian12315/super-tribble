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

btnSendForm.disabled = true;

webcam
  .start()
  .then(() => {
    console.log("webcam started");
  })
  .catch((err) => {
    console.log(err);
  });

const resizeBase64Img = (base64, maxWidth = 80, maxHeight = 60) => {
  return new Promise((resolve) => {
    let img = new Image();
    img.src = base64;
    img.onload = () => {
      let canvas = document.createElement("canvas");
      const MAX_WIDTH = maxWidth;
      const MAX_HEIGHT = maxHeight;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;

      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      resolve(canvas.toDataURL());
    };
  });
};

btnTakePhoto.addEventListener("click", async () => {
  const picture = webcam.snap();
  photoURI = picture;
  photoURI = await resizeBase64Img(photoURI);
  btnSendForm.className = `btn btn-lg btn-primary`;
  btnSendForm.disabled = false;
});

form.addEventListener("formdata", (e) => {
  const formData = e.formData;
  formData.append("uri", photoURI);
});
