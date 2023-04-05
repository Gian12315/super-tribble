const { downloadImageFromURL } = require("./imageDownloader.js");
/**
 * Finds the profile image with a taken id in the Moodle fyle system
 *
 * @param imageID The id of the profile image in the users Moodle database
 * @returns The URL of the profile image
 */

function getProfileImageURL({ imageID }) {

  // Change port and host according the route which Moodle is running
  const path = {
    host: "localhost",
    port: "80",
    route: "moodle/pluginfile.php/5/user/icon/boost/f1?rev",
    id: imageID,
  };

  const profileImagePath = `http://${path.host}:${path.port}/${path.route}=${path.id}`;

  const finalPath = `${process.cwd()}\\tmp\\profile.png`;

  downloadImageFromURL(profileImagePath, finalPath);

  return finalPath;
}

module.exports = {
  getProfileImageURL,
};
