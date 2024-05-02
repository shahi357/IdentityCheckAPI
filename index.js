const bodyParser = require("body-parser");
const fs = require("fs");
const { PDFDocument, rgb } = require("pdf-lib");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const checkVerification = require("./verificationService");

const express = require("express");
const app = express();

//Middleware setup
app.use(bodyParser.json());

// Configure nodemailer transporter
var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9631f35e30886c",
      pass: "00b0ad0a9df824"
    }
  });

// Function to generate a verification number
function generateVerificationNumber() {
  return uuidv4();
}
// POST /verify endpoint
app.post("/verify", async (req, res) => {
  const { ID, recipientEmail } = req.body;

  try {
    // Check verification status
    const verificationResult = await checkVerification(ID);

    // If verification result is not 'positive', ignore the request
    if (verificationResult !== "positive") {
      console.log("Sorry, Verification Un-successful!!");
      return res.status(403).send("Verification failed");
    }

    // If verification result is 'positive', proceed to generate PDF certificate
    console.log("Verification Successful!!");
    const templatePath = "./pdf_templates/IdentityCheck-Certificate-PRE.pdf";
    const templateBuffer = fs.readFileSync(templatePath);

    // Load the template PDF
    // const pdfDoc = await PDFDocument.load(templateBuffer);
    // const page = pdfDoc.getPage(0);

    // Insert verification number and other relevant data into the PDF
    const verificationNumber = generateVerificationNumber();

    // Convert the RGB color values to the range 0-1
    const colorRed = 0 / 255; // Red channel
    const colorGreen = 30 / 255; // Green channel
    const colorBlue = 95 / 255; // Blue channel

    console.log("Verification Number genrated:", verificationNumber);
    page.drawText(verificationNumber, {
      x: 200,
      y: 660,
      size: 12,
      color: rgb(colorRed, colorGreen, colorBlue),
    });

    // Save the modified PDF
    const modifiedPdfBytes = await pdfDoc.save();

    // Send email with the modified PDF attached
  //   const mailOptions = {
  //     from: "support@stackgo.io",
  //     to: recipientEmail,
  //     subject: "Identity Check Certificate",
  //     html: `
  //   <div style="font-family: Arial, sans-serif; padding: 20px; border-radius: 10px; background-color: #f5f5f5;">
  //     <h2 style="color: #333333; text-align: center;">Identity Verification Success!</h2>
  //     <p style="color: #666666; text-align: center; font-size: 16px;">Dear Recipient,</p>
  //     <p style="color: #666666; text-align: center; font-size: 16px;">Congratulations! Your identity has been successfully verified.</p>
  //     <p style="color: #666666; text-align: center; font-size: 16px;">Attached to this email is your Identity Check Certificate.</p>
    
  //     <p style="color: #666666; text-align: center; font-size: 16px;">Thank you for choosing StackGo.</p>
  //     <p style="color: #666666; text-align: center; font-size: 16px;">Best regards,<br>The StackGo Team</p>
  //   </div>
  // `,
  //     attachments: [
  //       {
  //         filename: "IdentityCheckCertificate.pdf",
  //         content: modifiedPdfBytes,
  //       },
  //     ],
  //   };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).send("Error sending email");
      }
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    });
  } catch (error) {
    console.error("Error during verification:", error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = app;