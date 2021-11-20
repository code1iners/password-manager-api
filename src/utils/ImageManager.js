import { createWriteStream } from "fs";
import AWS from "aws-sdk";

// AWS settings.
AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

/**
 * ### Save image into local server.
 * @param {Number} id > User id.
 * @param {Object} image > Image instance.
 * @returns {String} Image stored uri.
 */
export const saveImageIntoLocal = async ({ id, image }) => {
  const { filename, createReadStream } = await image;
  const storeFileName = `${id}-${Date.now()}-${filename}`;
  const readStream = createReadStream();
  const writeStream = createWriteStream(
    `${process.cwd()}/uploads/${storeFileName}.jpg`
  );
  readStream.pipe(writeStream);
  return `http://121.161.239.148:4000/static/${storeFileName}.jpg`;
};

/**
 * ### Save image into S3 aws storage.
 * @param {Number} id > User id.
 * @param {Object} image > Image instance.
 * @returns {String} Image stored uri.
 */
export const saveImageIntoS3 = async ({ id, image, directory = "uploads" }) => {
  const { filename, createReadStream } = await image;
  const storeFileName = `${directory}/${id}-${Date.now()}-${filename}`;
  const readStream = createReadStream();

  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "password-manager-achacha-uploads",
      Key: storeFileName,
      ACL: "public-read",
      Body: readStream,
    })
    .promise();
  return Location;
};
