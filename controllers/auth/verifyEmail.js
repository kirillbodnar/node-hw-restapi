const { RequestError } = require("../../helpers");
const { User } = require("../../models/user");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw RequestError(404, "User not Found");
  }
  await User.findByIdAndUpdate(user._id, {
    verified: true,
    verificationToken: "",
  });
  res.json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
