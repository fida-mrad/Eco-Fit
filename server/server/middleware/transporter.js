const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: "ecofit14@gmail.com",
      // pass: "jbktbshupncsnhkm",
      pass : "zvxvaljzivqvfnme"
    },
  });
module.exports = transporter