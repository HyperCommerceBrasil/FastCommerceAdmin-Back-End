import nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
const mailer = async () => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  console.log(process.env.EMAIL_USER);
  console.log(process.env.EMAIL_PASSWORD);
  console.log(process.env.EMAIL_SMTP);
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host:
      process.env.EMAIL_ENVIROMENT === 'local'
        ? 'smtp.ethereal.email'
        : process.env.EMAIL_SMTP,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user:
        process.env.EMAIL_ENVIROMENT === 'local'
          ? testAccount.user
          : process.env.EMAIL_USER, // generated ethereal user
      pass:
        process.env.EMAIL_ENVIROMENT === 'local'
          ? testAccount.pass
          : process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object

  return transporter;
};

export default mailer;
