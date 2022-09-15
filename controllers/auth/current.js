const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const current = async (req, res, next) => {
  const { _id } = req.user;
  const { email } = await User.findById(_id);

  if (!email) {
    RequestError(401, "Not authorized");
  }
  res.json(email);
};

module.exports = current;
