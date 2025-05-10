const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

console.log('Contact route file loaded');

router.post('/contact', async (req, res) => {
  console.log('POST /api/contact hit');


  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }

  try {
    // Step 1: Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // your Gmail
        pass: process.env.EMAIL_PASS  // the 16-character app password
      },
      tls: {
        rejectUnauthorized: false, // ← Allow self-signed certs
      },
    });

    // Step 2: Compose email
    const mailOptions = {
      from: `"NovaHost Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Where you receive the message
      replyTo: email, // Reply to the sender's email
      subject: `New contact form submission from ${name}`,
      text: `
        You have a new message from your NovaHost contact form:

        Name: ${name}
        Email: ${email}
        Message: ${message}
      `
    };

    // Step 3: Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
});

module.exports = router;
