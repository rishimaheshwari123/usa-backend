const { contactUsEmail } = require("../mail/contactFormRes");
const mailSender = require("../utils/mailSenderr");
const resumeSender = require("../utils/resumeSender")

const fs = require('fs');
const path = require('path');


exports.contactUsController = async (req, res) => {
  const { email, name, message, contact } = req.body;
  console.log(req.body);
  try {
    const emailRes = await mailSender(
      "rishimaheshwari040@gmail.com",
      // "yogendra@hereyogoit.com",
      "Your Data send successfully",
      contactUsEmail(email, name, message, contact)
    );
    // console.log("Email Res ", emailRes);
    return res.json({
      success: true,
      message: "Email send successfully",
    });
  } catch (error) {
    console.log("Error", error);
    console.log("Error message :", error.message);
    return res.json({
      success: false,
      message: "Something went wrong...",
    });
  }
};





exports.submitApplication = async (req, res) => {
  const { name, email, contact, message, applicationFor } = req.body;
  const resume = req.files?.resume;

  console.log('File Details:', {
    name: resume?.name,
    size: resume?.size,
    mimetype: resume?.mimetype,
    tempFilePath: resume?.tempFilePath,
  });

  if (!resume) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }

  try {
    const filePath = resume.tempFilePath;
    const fileData = await fs.promises.readFile(filePath);

    const attachments = [{
      filename: resume.name,
      content: fileData.toString('base64'),
      encoding: 'base64',
    }];

    const title = `Career Application from ${name}`;
    const body = `
      <h2>Application Details</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Contact:</strong> ${contact}</p>
      <p><strong>Application For:</strong> ${applicationFor}</p>
      <p><strong>Message:</strong> ${message}</p>
    `;

    console.log('Attachments:', attachments);

    // Example call to resumeSender function
    await resumeSender(email, title, body, attachments);

    res.status(200).json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error handling application:', error);
    res.status(500).json({ success: false, message: 'Failed to submit application' });
  }
};