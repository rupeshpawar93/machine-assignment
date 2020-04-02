var multer = require("multer");
var MIME_TYPE_MAP = [];
const POST_MAX_SIZE = 1 * 1024 * 1024; //MB
const UPLOAD_MAX_FILE_SIZE = 2;

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log(file + "-----");
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + file.originalname);
  }
});

/**
 * function singleFIle
 *
 * */
exports.sinlgeFile = (req, res, next) => {
  multer({ storage: storage, limits: { fileSize: POST_MAX_SIZE } }).single(
    "uploader"
  )(req, res, function(err) {
    //Catching and handling errors of multer
    if (err instanceof multer.MulterError) {
      return res.status(500).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }
    next();
  });
};
