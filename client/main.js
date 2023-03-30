const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const snapSoundElement = document.getElementById('snapSound');
const btnTakePhoto = document.getElementById('takePhoto');
let picId = 0;
const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);
const url = "http://localhost:8000/api";

webcam.start()
   .then(() =>{
      console.log("webcam started");
   })
   .catch(err => {
       console.log(err);
   });

getUserPicture(picId);
btnTakePhoto.addEventListener('click', async () => {
    const picture = webcam.snap();
    const body = {
       uri: picture,
       email: getEmail()
    };
    const pictureId = await fetch(url, {
        method: "POST",
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(body)
    });
    picId = pictureId;
});

function getUserPicture(pictureId) {
    if(!pictureId) { return; }
    const img = document.getElementById('userPicture');
    img.src = `http://localhost:3000/moodle/pluginfile.php/5/user/icon/boost/f1?rev=${pictureId}`;
}

function getEmail() {
    const email = document.getElementById('email');
    return email.value;
}