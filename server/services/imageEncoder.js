const fs = require("fs");

/**
 * @param image The file name
 * @returns base64 encoded image
 */

function encode(file) {
  const bitmap = fs.readFileSync(file);
  return bitmap;
}

module.exports = {
  encode,
};
