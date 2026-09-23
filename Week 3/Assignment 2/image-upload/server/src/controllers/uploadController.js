const upload = require('../config/multer');

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please select an image'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: `/uploads/${req.file.filename}`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Image upload failed'
    });
  }
};

module.exports = {
  uploadImage
};
