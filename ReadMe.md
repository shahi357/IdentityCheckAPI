# Identity Verification Service
This project provides an identity verification service that generates and sends Identity Check Certificates via email upon successful verification

# Files
❖ verificationService.js: This file contains the function `checkVerification(ID)` which checks the 
verification status of the provided ID. If the ID is valid, it returns "positive"; otherwise, it returns 
"negative".

❖ index.js: This sets up an Express.js and defines the `/verify` endpoint for handling verification requests. Upon receiving a verification request, it checks the verification status using `checkVerification(ID)`, generates a PDF certificate, and sends an email to the recipient with the certificate attached.

❖ server.js: this file is the entry point of the serer start. it sets the port number.