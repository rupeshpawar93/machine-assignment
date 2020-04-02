const SECRET_KEY = process.env.SECRET_KEY;
var jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
var excludedUrls = ["/api/register", "/api/signin"];

// GetTokenFromHeader
let getTokenFromHeader = headers => {
  if (headers && headers.authorization) {
    let authorization = headers.authorization;
    let part = authorization.split(" ");

    if (part.length === 2) {
      return part[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// Signing the token
exports.signToken = user => {
  return jwt.sign(user, SECRET_KEY, {
    expiresIn: 99999 * 999999999999999999999
  });
};

// Verifying token from the user
exports.verifyToken = (req, res, next) => {
  let currUrl = req.originalUrl;

  if (!excludedUrls.includes(currUrl)) {
    // check header or url parameters or post parameters for token
    let token = getTokenFromHeader(req.headers);
    if (token) {
      jwt.verify(token, SECRET_KEY, async (err, decoded) => {
        if (err) {
          return res.status(401).send("Failed to authenticate");
        } else {
          let userDetail = {
            id: decoded.id
          };
          let User = mongoose.model("users");
          let flag = await User.findOne({ _id: decoded.id });
          if (flag) {
            req.user_id = decoded.id;
            req.newToken = this.signToken(userDetail);
            next();
          } else {
            return res.status(401).json({ error: "Failed to authenticate" });
          }
        }
      });
    } else {
      // if there is no token
      // return an error
      return res.status(403).send("No token was provided.");
    }
  } else {
    next();
  }
};
