const mongoose = require("mongoose");
let Schema = mongoose.Schema;
let userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
      validate: [validateString, "Please fill a valid name"]
    },
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
      validate: [validateString, "Please fill a valid username"]
    },
    password: {
      type: String,
      min: 6,
      max: 30,
      required: true
    },
    file_id: [
      {
        type: Schema.Types.ObjectId,
        ref: "file"
      }
    ]
  },
  {
    timestamps: true
  }
);
/**
 * @param email
 * @returns boolean value
 * */
let validateString = string => {
  var re = /^[A-Za-z0-9 ]+$/;
  return re.test(string);
};

userSchema.pre("save", function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(config.SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// to compare password
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
