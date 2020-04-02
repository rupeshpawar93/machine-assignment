const { check, validationResult } = require("express-validator/check");
var User = require("./../Models/User").default;

/**
 * @param name
 * @param username
 * @password password
 * @returns token
 * */
exports.register = [
  check("name")
    .isLength({ min: 3 })
    .withMessage("length must be or greater then 3"),
  check("username")
    .isLength({ min: 3 })
    .withMessage("length must be or greater then 3")
    .isEmail()
    .withMessage("Must be valid Email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("length must be or greater then 6")
    .isAlphanumeric()
    .withMessage("Must be only alphanumeric"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let userDetail = {
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    };

    let newUser = new User(userDetail);
    newUser.save((err, result) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        result = result.toObject();
        res.status(200).send(result);
      }
    });
  }
];
