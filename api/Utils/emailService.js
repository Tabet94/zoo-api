
// // utils/emailService.js
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   host: 'marwa.boss94@gmail.com', // Replace with your SMTP server
//   port: 587, // or 465 for secure
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: process.env.EMAIL_USER, // Your email
//     pass: process.env.EMAIL_PASS, // Your email password or app-specific password
//   },
// });

// const sendEmail = async (to, subject, text) => {
//   try {
//     const mailOptions = {
//       from: process.env.EMAIL_USER, // Sender's email address
//       to, // Recipient email address
//       subject, // Subject of the email
//       text, // Plain text body
//     };

//     await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     throw error; // Re-throw the error to handle it in the caller
//   }
// };

// module.exports = { sendEmail };


