const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, 'public/uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 1024 * 5,
  },
  fileFilter: (req, file, callback) => {
    const types = /jpeg|jpg|png|gif/;
    const extName = types.test(path.extname(file.originalname).toLowerCase());
    const mimeTypes = types.test(file.mimetype);
    console.log('file filter');
    if (extName && mimeTypes) {
      callback(null, true);
    } else {
      callback(new Error('Only support error'));
    }
  },
});

module.exports = upload;
