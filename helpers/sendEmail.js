const sgMail = require("@sendgrid/mail");

const { VERIFICATION_API_KEY } = process.env;

sgMail.setApiKey(VERIFICATION_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "kirillbodnarr@gmail.com" };
    await sgMail.send(email);
    return true;
  } catch (error) {}
};

module.exports = sendEmail;
