const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");
const { SECRET_KEY } = require("../config");

module.exports.generateToken = user => {
  return jwt.sign({
      key: user.key,
      username: user.username,
      id: user._id,
    },
    SECRET_KEY,
    { expiresIn: "24h" }
  );
}

module.exports.checkAuth = context => {
  const token = context.req.headers.authorization;

  if (token) {
    try {
      const user = jwt.verify(token, SECRET_KEY);
      return user;
    } catch (error) {
      throw new AuthenticationError("Invalid/Expired token");
    }
  }
  throw new Error("Authentication header must be provided");
};