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

module.exports = app;