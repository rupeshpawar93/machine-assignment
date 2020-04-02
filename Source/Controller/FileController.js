const { check, validationResult } = require("express-validator");
const { User, File } = require("./../Models/Module");

/**
 * @api {post} /api/app/upload-file upload file
 * @apiName store
 * @returns File
 * */
exports.store = async (req, res) => {
  if (!req.file) {
    res.status(404).json({ error: "No file Found" });
  }
  try {
    let file = {
      file_name: req.file.filename,
      file_path: req.file.path,
      user_id: req.user_id
    };
    let newFile = new File(file);
    //   save file
    let fileData = await newFile.save();

    //   add reference of file in user
    await User.findOneAndUpdate(
      { _id: req.user_id },
      { $push: { file_id: fileData._id } },
      {
        upsert: true
      }
    );
    res.status(200).json({ data: fileData, message: "Success" });
  } catch (err) {
    res.status(500).json({ error: err.message, message: "Failed" });
  }
};

exports.remove = async (req, res) => {};
