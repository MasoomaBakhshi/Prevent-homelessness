const multer = require('multer');

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});

module.exports.upload = upload;

module.exports.handleImage = (images) => async (request, response, next) => {
  if (!request.file) return next();
  if (
    request.file.mimetype !== 'image/png' &&
    request.file.mimetype !== 'image/jpeg' &&
    request.file.mimetype !== 'image/jpg'
  ) {
    return next(new Error('File format is not supported'));
  }
  request.file.storedFilename = await images.store(request.file.buffer);
  return next();
};

module.exports.handleBigImage = (images) => async (request, response, next) => {
  if (!request.file) return next();
  if (
    request.file.mimetype !== 'image/png' &&
    request.file.mimetype !== 'image/jpeg' &&
    request.file.mimetype !== 'image/jpg'
  ) {
    return next(new Error('File format is not supported'));
  }
  request.file.storedFilename = await images.Bigstore(request.file.buffer);
  return next();
};
