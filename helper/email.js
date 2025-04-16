const nodemailer = require("nodemailer");
const { smtpUserName, smtpPassword } = require("../src/secret");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: smtpUserName,
    pass: smtpPassword,
  },
});
const emailWithNodeMailer = async (emailData) => {
  try {
    const info = await transporter.sendMail({
      from: smtpUserName,
      to: emailData.email,
      subject: emailData.subject,
      html: emailData.html,
    });

    console.log("informations", info);
  } catch (error) {
    console.log("Error occured while sending email", error);
    throw error;
  }
};

module.exports = {
  emailWithNodeMailer,
};
