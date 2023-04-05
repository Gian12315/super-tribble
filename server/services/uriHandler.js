const imageDataUri = require("image-data-uri");

function saveImage({ uri }) {
  const base64URi = uri.split(",")[1];
  // console.log(base64URi);
  const path = `${process.cwd()}\\tmp\\login.png`;
  imageDataUri.outputFile(uri, path);
  return path;
}

exports.saveImage = saveImage;
