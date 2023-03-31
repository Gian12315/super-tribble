const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const snapSoundElement = document.getElementById('snapSound');
const btnTakePhoto = document.getElementById('takePhoto');
const webcam = new Webcam(webcamElement, 'user', canvasElement, snapSoundElement);
const url = "http://localhost:8000/api";
const moodleUrl = "http://localhost:80/moodle/login/index.php";

webcam.start()
   .then(() =>{
      console.log("webcam started");
   })
   .catch(err => {
       console.log(err);
   });

btnTakePhoto.addEventListener('click', async () => {
    // Disabled for debuggin
    const picture = webcam.snap();
    console.log(picture)
    const body = {
       uri: 'foo',
       email: getEmail()
    };
    const res = await getToken(body);
    console.log("Es o tlinin")
    sendToken(res);
});

/**
 * Finds moodle user image by the id and renderizes on the login.
 * @param {number} pictureId 
 * @returns 
 */
const getUserPicture = (pictureId) => {
    if(!pictureId) { return; }
    const img = document.getElementById('userPicture');
    img.src = `http://localhost:80/moodle/pluginfile.php/5/user/icon/boost/f1?rev=${pictureId}`;
}

/**
 * Sends the uri and the email to localhost:8000/api
 * @returns '{pic: pictureOfUser, password: passwordOfUser, id: idOfUser}'
 */
const getToken = async (body={}) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(body)
    });
    return res.json();
}

/**
 * Sends the response of getToken to localhost:3000/moodle/index.php
 * @param {Object} body - the json response of getToken   
 */

const sendToken = async (body={}) => {
    console.log(body)
    // TODO: petition rejected by cors
    const rata = await fetch(moodleUrl, {
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-Type' : 'application/json', 
            'Access-Control-Allow-Origin' : 'http://localhost:80'
        },
        body: JSON.stringify(body)
    })
    console.log(rata)
// window.location.replace("http://localhost:80/moodle/login/index.php");
}

/**
 * Gets the string of the input with the id 'email'.
 * @returns
*/

const getEmail = () => {
    const email = document.getElementById('email');
    return email.value;
}
