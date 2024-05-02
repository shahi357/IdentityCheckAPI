# Identity Verification Service
This project provides an identity verification service that generates and sends Identity Check Certificates via email upon successful verification

# Files
❖ verificationService.js: This file contains the function `checkVerification(ID)` which checks the verification status of the provided ID. If the ID is valid, it returns "positive"; otherwise, it returns "negative".

❖ index.js: This sets up an Express.js and defines the `/verify` endpoint for handling verification requests. Upon receiving a verification request, it checks the verification status using `checkVerification(ID)`, generates a PDF certificate, and sends an email to the recipient with the certificate attached.

❖ server.js: this file is the entry point of the serer start. it sets the port number.

# Packages
❖ express: A web framework for Node.js used to create the server and handle HTTP requests.
❖ body-parser: Middleware for parsing JSON request bodies.
❖ fs: A built-in Node.js module for working with the file system, used to read the PDF template file.
❖ pdf-lib: A library for creating and modifying PDF documents, used to load the template PDF, insert the verification number, and save the modified PDF.
❖ nodemailer: A module for sending emails from Node.js applications, used to send the email with the PDF certificate attached.
❖ nodemon: A utility that automatically restarts the server when changes are made to the source code during development.
❖ uuid: A module for generating unique identifiers, used to generate verification numbers for the certificates.

# Setup
1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Run the server using `npm start` or `nodemon server.js`.
4. Send POST requests to `http://localhost:3000/verify` with the required parameters (`ID` and `recipientEmail`) to initiate the verification process.

# Configuration
❖ Update the SMTP configuration in `index.js` to use your email service provider.
❖ Customize the HTML template in the `mailOptions` object to fit your branding and messaging preferences.