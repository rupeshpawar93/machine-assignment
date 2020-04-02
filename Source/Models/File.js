const mongoose = require("mongoose");
var Schema = mongoose.Schema;

let fileSchema = new Schema(
  {
    file_name: {
      type: String,
      required: true
    },
    file_path: {
      type: String,
      required: true
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "file"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("files", fileSchema);
