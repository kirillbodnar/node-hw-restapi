const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const nanoid = require("nano-id");
const { User } = require("../../models/user");

const { RequestError, sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "User with this email already exists");
  }
  const verificationToken = nanoid();
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Confirm email for registration",
    html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}" target="_blank">Click to confrim registration`,
  };
  await sendEmail(mail);
  res.status(201).json({
    email: result.email,
  });
};

module.exports = register;
