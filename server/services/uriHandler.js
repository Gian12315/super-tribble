const imageDataUri  = require('image-data-uri');

function saveImage({ uri, path }) {
    imageDataUri.outputFile(uri, path);
}

exports.saveImage = saveImage