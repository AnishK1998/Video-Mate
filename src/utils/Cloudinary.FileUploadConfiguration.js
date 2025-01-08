import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadFileInCloudinary = async (localFilePAth) => {
  // Cloudinary Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
  });

  try {
    //localFilePAth is not there then return null and quit the function
    if (!localFilePAth) return null;
    //upload the file
    const responseOfFileUpload = await cloudinary.uploader.upload(
      localFilePAth,
      { resource_type: "auto" }
    );

    //after successful upload of file remove file synchronously from temp folder
    fs.unlinkSync(localFilePAth);
    return responseOfFileUpload;
  } catch (error) {
    console.log("failed to upload file in cloudinary ", error);
    //this is to remove this temporary file from our server
    fs.unlinkSync(localFilePAth);

    return null;
  }
};

export { uploadFileInCloudinary };
