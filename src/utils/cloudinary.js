import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// without this config how will cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        console.log(
            "File successfully uploaded on cloudinary on URL: ",
            response.url
        );
        return response;
    } catch (error) {
        // removes the locally saved temporary file if the upload operation
        // fails. This prevents storage of any corrupted file.
        // operation is performed synchronously because we want further
        // operation to resume only after unlinking
        fs.unlinkSync(localFilePath);
        return null;
    }
};
