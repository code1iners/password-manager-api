import { createWriteStream } from "fs";

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
