'use strict';

var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

var TOKENTIME = 60 * 60 * 24 * 30; // 30 days
var SECRET = "W3 Hav3 th3 kn0w h0w";

var authenticate = expressJwt({ secret: SECRET });

var generateAccessToken = function generateAccessToken(req, res, next) {
  req.token = req.token || {};
  req.token = jwt.sign({
    id: req.user.id
  }, SECRET, {
    expiresIn: TOKENTIME // 30 days
  });
  console.log(req.token);
  next();
};

var respond = function respond(req, res) {
  res.status(200).json({
    user: req.user.username,
    token: req.token
  });
};

module.exports = {
  authenticate: authenticate,
  generateAccessToken: generateAccessToken,
  respond: respond
};
//# sourceMappingURL=authMiddleware.js.map