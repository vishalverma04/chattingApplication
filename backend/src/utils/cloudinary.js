import dotenv from 'dotenv'

dotenv.config({path:"./.env"})
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
   
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (filepath) => {
    
try {
    const response = await cloudinary.uploader.upload(filepath, {
      folder: 'chatAppMessages',
    });
    // Remove the temporary file after uploa
    return response;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return null;
  }finally{
    // Ensure the temporary file is removed
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  }
}

const uploadPdfOnCloudinary = async (pdfLocalPath) => {
   
    try {
      if (!pdfLocalPath) return;

      // Check if the file exists
      if (!fs.existsSync(pdfLocalPath)) {
        console.error(`File does not exist: ${pdfLocalPath}`);
        return;
      }

      // Upload the file to Cloudinary
      const result = await cloudinary.uploader.upload(pdfLocalPath, {
        resource_type: "raw", // You can specify "image" if files are always images
      });

      // Remove the temporary file

      fs.unlinkSync(pdfLocalPath);
      const downloadUrl = `https://res-console.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/media_explorer_thumbnails/${result.asset_id}/download`;
      return downloadUrl;
    }
    catch (error) {
      console.error(`Error uploading file: ${pdfLocalPath}`);
      console.error(error);

      // Remove the temporary file even if the upload fails
      if (fs.existsSync(pdfLocalPath)) {
        fs.unlinkSync(pdfLocalPath);
      }

      throw new Error(`Error uploading PDF to Cloudinary: ${error.message}`);
    }
  }


export {uploadOnCloudinary,uploadPdfOnCloudinary}