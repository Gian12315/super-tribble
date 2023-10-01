require("dotenv").config();
const { saveImage } = require("./services/uriHandler.js");
const {
  getUserPicture,
  getUserPassword,
  getUserId,
} = require("./services/querys.js");
const { compareFaces } = require("./services/faceMathcing.js");
const { getProfileImageURL } = require("./services/profileImageFinder.js");
const fs = require("fs");
const { resolve } = require("path");

const [email] = process.argv.slice(2);
const auth = async (email) => {

    const path = `${__dirname}/tmp/.uri`;

    let uri = "";
    try {
        uri = fs.readFileSync(resolve(path),  { encoding: "utf8" });
    }catch(err) {
        console.error(err);
    }

    if(uri == undefined) {
    console.log("The uri is undefined");
    }

    const userPic = await getUserPicture({ email: email });

    if (userPic === 0) {
        console.error("User picture value can't be zero.");
    }

    const userPassword = await getUserPassword({ email: email });
    const userId = await getUserId({ email: email });

    const imagePath = saveImage({ uri: uri });

    const profileImagePath = await getProfileImageURL({ imageID: userPic });

    const hasMatch = await compareFaces({
        photoSource: imagePath,
        photoTarget: profileImagePath,
    });

    console.log("Resulados:");
    if (hasMatch) {
        // Send the data
        console.log({ id: userId, password: userPassword });
    } else {
        /* Login failed */
        console.error("Login failed.");
    }
}

(async() => await auth(email))();