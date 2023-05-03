const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // console.log(req.headers);
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("access denied");
  }

  token = token.split(" ")[1];

  if (token == null) {
    return res.status(401).send("access denied");
  }

  let verifiedUser = jwt.verify(token, process.env.JWT_KEY);
  // console.log(verifiedUser);
  if (!verifiedUser) {
    return res.status(401).send("access denied");
  }

  req.user = verifiedUser;
  next();
};

module.exports = { verifyToken };
