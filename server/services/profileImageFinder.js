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
    port: "3000",
    route: "moodle/pluginfile.php5/user/icon/boost/f1?rev",
    id: imageID,
  };

  const profileImagePath = `http://${path.host}:${path.port}/${path.route}=${path.id}`;
  return profileImagePath;
}

module.exports = {
  getProfileImageURL,
};
