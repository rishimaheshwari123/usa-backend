const { uploadImageToCloudinary } = require("../config/imageUploader")
const fs = require('fs');

exports.uploadImages = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ success: false, message: 'No files were uploaded.' });
    }
    console.log(req.files)
    const files = req.files.thumbnail;
    const urls = [];

    const fileArray = Array.isArray(files) ? files : [files];

    for (const file of fileArray) {
      const newpath = await uploadImageToCloudinary(file, process.env.FOLDER_NAME);
      urls.push(newpath);
      fs.unlinkSync(file.tempFilePath);
    }

    res.status(200).json({
      success: true,
      message: 'Images uploaded successfully',
      images: urls
    });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ success: false, message: 'Image upload failed', error });
  }
};