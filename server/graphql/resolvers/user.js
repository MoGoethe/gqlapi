const bcrypt = require("bcrypt");
const { UserInputError } = require("apollo-server");
const User = require("../../models/User");
const { validateRegisterInput, validateLoginInput } = require("../../utils/validators");
const { generateToken } = require("../../utils/tools");

module.exports = {
  Mutation: {
    async login(_, {loginInput: { username, password }}) {
      const { errors, valid } = validateLoginInput(username, password);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token
      };
    },
    async register(
      _, 
      { registerInput: { username, password, confirmPassword, email } }, 
    ) {

      const { errors, valid } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const _user = await User.findOne({username});
      if (_user) {
        throw new UserInputError("Username has been token", {
          errors: {
            username: "username has been token",
          }
        });
      }
      password = await bcrypt.hash(password, 10);
      const user = new User({
        username,
        password,
        email,
        createAt: new Date().toISOString(),
      });
      const res = await user.save();

      const token = generateToken(user);

      return {
        ...res._doc,
        id: res._id,
        token
      };
    }
  }
}