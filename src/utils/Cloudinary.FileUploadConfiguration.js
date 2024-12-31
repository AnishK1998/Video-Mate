import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadFileInCloudinary = async (localFilePAth) => {
  try {
    //localFilePAth is not there then return null and quit the function
    if (!localFilePAth) return null;
    //upload the file
    const responseOfFileUpload = await cloudinary.uploader.upload(
      localFilePAth,
      { resource_type: "auto" }
    );
    console.log("File is uploaded successfully ", responseOfFileUpload);
    return responseOfFileUpload;
  } catch (error) {
    //this is to remove this temporary file from our server
    fs.unlinkSync(localFilePAth);

    return null;
  }
};

export {uploadFileInCloudinary}

// Cloudinary Configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
// });
