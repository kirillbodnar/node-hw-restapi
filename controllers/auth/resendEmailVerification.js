const { User } = require("../../models/user");
const { RequestError, sendEmail } = require("../../helpers");

const resendEmailVerification = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(404, "Not found");
  }
  if (user.verified) {
    throw RequestError(400, "User already verified");
  }
  const mail = {
    to: email,
    subject: "Confirm email for registration",
    html: `<a href="http://localhost:3000/api/auth/verify/${user.verificationToken}" target="_blank">Click to confrim registration`,
  };
  await sendEmail(mail);
  res.json({ message: "Email verification has been resent" });
};

module.exports = resendEmailVerification;
