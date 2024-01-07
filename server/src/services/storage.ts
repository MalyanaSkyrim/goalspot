import { Storage } from "@google-cloud/storage";
import { AddFieldImagesInput } from "../modules/field/field.schema";

const storage = new Storage({
  keyFilename: process.env.GC_KEY_FILE_NAME,
});

const bucketName = "field-images";

// cspell:disable
const imageMimeExtensions = {
  "image/bmp": ".bmp",
  "image/gif": ".gif",
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/tiff": ".tiff",
  "image/webp": ".webp",
  "image/x-icon": ".ico",
  "image/vnd.microsoft.icon": ".ico",
  "image/svg+xml": ".svg",
  "image/svg": ".svg",
  "image/svg-xml": ".svg",
  "image/heif": ".heif",
  "image/heic": ".heic",
  "image/jp2": ".jp2",
  "image/jpx": ".jpx",
  "image/jpm": ".jpm",
  "image/jxr": ".jxr",
  "image/x-jng": ".jng",
  "image/x-ms-bmp": ".bmp",
  "image/x-photoshop": ".psd",
  "image/x-portable-anymap": ".pnm",
  "image/x-portable-bitmap": ".pbm",
  "image/x-portable-graymap": ".pgm",
  "image/x-portable-pixmap": ".ppm",
  "image/x-rgb": ".rgb",
  "image/x-xbitmap": ".xbm",
  "image/x-xpixmap": ".xpm",
  "image/x-xwindowdump": ".xwd",
} as const;
// cspell:enable

type ImageMime = keyof typeof imageMimeExtensions;

const getImageExtension = (mime: string) => {
  return imageMimeExtensions[mime as ImageMime] ?? ".jpg";
};

const getImageByIndex = async (
  bucketName: string,
  fieldId: string,
  index: string
) => {
  const [files] = await storage.bucket(bucketName).getFiles({
    prefix: `${fieldId}`,
  });

  return files.find((file) => file.metadata.metadata?.index === index);
};

export const uploadImage = async (
  image: AddFieldImagesInput["images"][0],
  fieldId: string
) => {
  const bucket = storage.bucket(bucketName);

  const filename = `${fieldId}/${new Date().toISOString()}${getImageExtension(
    image.mime
  )}`;
  const base64Data = image.base64;

  const buffer = Buffer.from(base64Data, "base64");

  const file = bucket.file(filename);

  const exitingFile = await getImageByIndex(
    bucketName,
    fieldId,
    image.index.toString()
  );

  if (exitingFile) {
    await exitingFile.delete();
    console.log(`${filename} deleted from ${bucketName}.`);
  }

  await file.save(buffer, {
    metadata: {
      contentType: image.mime,
    },
  });

  await file.setMetadata({
    metadata: {
      index: image.index.toString(),
    },
  });

  await file.makePublic();
  console.log(`${filename} uploaded to ${bucketName}.`);
  return file.publicUrl();
};

export const removeImage = async (fieldId: string, index: string) => {
  const bucket = storage.bucket(bucketName);

  const file = await getImageByIndex(bucketName, fieldId, index);

  if (file) {
    await file.delete();
    console.log(`${file.name} deleted from ${bucketName}.`);
  }
};
