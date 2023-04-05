const imageDataUri = require("image-data-uri");

function saveImage({ uri }) {
  const path = `${process.cwd}/tmp/test.png`;
  imageDataUri.outputFile(uri, path);
  return path;
}

exports.saveImage = saveImage;
