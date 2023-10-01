require("dotenv").config();
const {
  RekognitionClient,
  CompareFacesCommand,
} = require("@aws-sdk/client-rekognition");
const { encode } = require("./imageEncoder.js");

/**
 * Matches the similarity bewteen two images with help of AWS Rekognition
 * @param photoSource The url of the photo taken in the login
 * @param photoTarget The url of the profile photo of the user in moodle
 *
 * @returns A boolean determining if is the same person or not
 */
const compareFaces = async ({ photoTarget, photoSource }) => {
  const client = new RekognitionClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_PUBLIC_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  });

  try {
    const command = new CompareFacesCommand({
      SourceImage: {
        Bytes: encode(photoSource),
      },
      TargetImage: {
        Bytes: encode(photoTarget),
      },
      SimilarityThreshold: 80,
    });
    const data = await client.send(command);
    //console.log("Ya se envio el comando rey");
    //console.log(data);

    return data.FaceMatches.length != 0 && data.FaceMatches[0].Similarity > 80;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  compareFaces,
};
