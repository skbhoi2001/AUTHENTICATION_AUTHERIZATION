const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'soumyak-testing',
  api_key: '662761355222978',
  api_secret: 'raQrJOf7FHqXxIQRbN0ogtBT1k4',
  secure: true,
});

module.exports = cloudinary;
