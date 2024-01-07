// helper/s3.js
// process.env.AWS_SUPPRESS_WARN = "1";
import AWS from "aws-sdk";
import { readFileSync, promises as fsPromises } from "fs";
import dotenv from "dotenv";

dotenv.config();

const bucketName = process.env.YOUR_BUCKET_NAME;
const accessKeyId = process.env.YOUR_ACCESS_KEY_ID;
const secretAccessKey = process.env.YOUR_SECRET_ACCESS_KEY;
const region = process.env.YOUR_REGION;

AWS.config.update({
  accessKeyId,
  secretAccessKey,
  region,
});

const s3 = new AWS.S3();

async function uploadFileToS3(file) {
  try {
    const fileContent = readFileSync(file.path);

    const params = {
      Bucket: bucketName,
      Key: file.filename,
      Body: fileContent,
    };

    const response = await s3.upload(params).promise();

    console.log(response, "response from function");

    // Delete from the local folder after upload
    await fsPromises.unlink(file.path);

    return response;
  } catch (err) {
    console.error(err);
  }
}

export { uploadFileToS3 };
