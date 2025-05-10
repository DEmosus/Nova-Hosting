const express = require("express");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const router = express.Router();

router.post("/api/start-hosting", async (req, res) => {
  const { name, email, domain, plan, template } = req.body;

  if (!name || !email || !domain || !plan) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Email config
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // ← Allow self-signed certs
    },
  });

  const mailOptions = {
    from: `"NovaHost Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `New Hosting Setup Request from ${name}`,
    text: `
New hosting request received:

Name: ${name}
Email: ${email}
Domain: ${domain}
Plan: ${plan}
Template: ${template}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Hosting setup request sent via email!" });
  } catch (emailError) {
    console.error("Email failed, saving to file instead:", emailError);

    // Fallback: Save to requests.json
    const requestData = {
      name,
      email,
      domain,
      plan,
      template,
      timestamp: new Date().toISOString(),
    };

    const filePath = path.join(__dirname, "../data/requests.json");

    try {
      // Ensure directory exists
      fs.mkdirSync(path.dirname(filePath), { recursive: true });

      // Read current data
      let existing = [];
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf8");
        existing = JSON.parse(fileContent || "[]");
      }

      existing.push(requestData);

      fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

      res
        .status(200)
        .json({ message: "Email failed, but request saved locally." });
    } catch (fileError) {
      console.error("Failed to save request to file:", fileError);
      res
        .status(500)
        .json({ error: "Failed to save request. Please try again later." });
    }
  }
});

module.exports = router;
