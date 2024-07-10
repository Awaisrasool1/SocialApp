const multer = require('multer');

 const multerUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

const singleAvater = multerUpload.single('Image');

module.exports = singleAvater;
