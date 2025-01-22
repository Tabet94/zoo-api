const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // your Gmail email address
      pass: process.env.EMAIL_PASS, // your Gmail password or App Password
    },
  });
const contactUs = async (req, res) => {
  const { name, email, message } = req.body;



  if (!name || !email || !message) {
    console.log('Validation failed: Missing fields');
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Save to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();
   

    // Send Email
    const mailOptions = {
      from: email, 
      to: process.env.EMAIL_USER, 
      subject: `Contact Form Submission from ${name}`,
      text: `You received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

   

    await transporter.sendMail(mailOptions);
   

    res.status(200).json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Failed to send the message. Please try again later.' });
  }
};

module.exports = { contactUs };
