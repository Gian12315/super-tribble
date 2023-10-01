const fs = require('fs');
const axios = require("axios");
  
const downloadImageFromURL = async (url, filename) => {
   const res = await axios({
      url,
      method: "GET",
      responseType: "stream"
   })

   const writer = fs.createWriteStream(filename);

   res.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
};

module.exports = {
    downloadImageFromURL
}
