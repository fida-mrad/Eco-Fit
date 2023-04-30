var Admin = require("../models/admin");
var Client = require("../models/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("./config");
const _ = require("lodash");
const transporter = require("../middleware/transporter");
require("dotenv").config();
const mongoose = require("mongoose");
const Agent = require("../models/agent");

const adminController = {
  addAdmin: async (req, res) => {
    try {
      const { email, password, profileimg } = req.body;
      if (!email || !password)
        return res.status(400).json({ msg: "Please fill in all fields." });
      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid Email." });
      const admin = await Admin.findOne({ email: email });
      if (admin) return res.status(400).json({ msg: "Admin already exists." });
      const passwordHash = await bcrypt.hash(password, 10);

      const newAdmin = new Admin({
        profileimg,
        email,
        password: passwordHash,
      });
      await newAdmin.save();
      return res
        .status(201)
        .json({ message: "New Admin Added Successfully !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  isAdmin: async (req, res, next) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ msg: "Unauthorized" });
    req.body.admin = admin;
    res.status(200);
    next();
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const admin = await Admin.findOne({ email });
      if (!admin) return res.status(400).json({ msg: "Unauthorized" });

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Incorrect Credentials." });
      const refreshtoken = createRefreshToken({
        id: admin._id,
        role: admin.role,
      });
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1d
      });
      res.json({ msg: "Login success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken");
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  refreshToken: (req, res) => {
    try {
      const exp = req.body.exp;
      const currentTime = Math.floor(Date.now() / 1000); // get current time in seconds
      if (exp < currentTime)
        return res.status(401).send("Unauthorized : Token Expired");
      const newToken = createRefreshToken({
        id: req.body.id,
        role: req.body.role,
      });
      res
        .cookie("refreshtoken", newToken, {
          httpOnly: true,
          maxAge: 1 * 24 * 60 * 60 * 1000, // 1d
        })
        .send("New Token Generated");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAdmin: async (req, res) => {
    const id = req.body.id;
    // Get the user profile based on the ID
    const loggedInAdmin = await Admin.findById(id);

    res.header("Access-Control-Allow-Credentials", true);

    // Return the user profile
    res
      .status(200)
      .send(_.pick(loggedInAdmin, ["email", "profileimg", "role"]));
  },
  banClient: async (req, res) => {
    const clientId = req.body.clientId;
    if (!clientId || !mongoose.Types.ObjectId.isValid(clientId))
      return res.status(400).send("Client Not Specified");
    let bannedClient = await Client.findOneAndUpdate(
      { _id: clientId },
      { banned: true },
      {
        returnOriginal: false,
      }
    );
    if (!bannedClient) return res.status(400).send("Client Not Found");
    return res.status(200).send("Client Banned");
  },
  banAgent: async (req, res) => {
    const agentId = req.body.agentId;
    if (!agentId || !mongoose.Types.ObjectId.isValid(agentId))
      return res.status(400).send("Client Not Specified");
    let bannedAgent = await Agent.findOneAndUpdate(
      { _id: agentId },
      { banned: true },
      {
        returnOriginal: false,
      }
    );
    if (!bannedAgent) return res.status(400).send("Agent Not Found");
    return res.status(200).send("Brand Agent Banned");
  },
  approve: async (req, res) => {
    const agentId = req.body.agentId;
    console.log(agentId);
    if (!agentId || !mongoose.Types.ObjectId.isValid(agentId))
      return res.status(400).send("Agent Not Specified");
    let approvedAgent = await Agent.findOneAndUpdate(
      { _id: agentId },
      { approved: true },
      {
        returnOriginal: false,
      }
    );
    if (!approvedAgent) return res.status(400).send("Agent Not Found");
    return res.status(200).send("Brand Agent Approved");
  },
  forgot: async (req, res) => {
    try {
      // get email
      const { email } = req.body;

      // check email if exits in db
      const admin = await Admin.findOne({ email });
      if (!admin)
        return res
          .status(400)
          .send({ msg: "This email is not registered in our system." });

      // create token
      const token = createToken({ id: admin._id });
      const url = `http://localhost:3000/admin/reset/${token}`;
      // send email
      transporter.sendMail({
        to: admin.email,
        subject: "Resest Password",
        html: `<html lang="en">
        <head>
          <meta charset="UTF8" />
          <meta httpequiv="XUACompatible" content="IE=edge" />
          <meta name="viewport" content="width=devicewidth, initialscale=1.0" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
            rel="stylesheet"
          />
          <title>EcoFit | Reset Password</title>
          <style>
            body {
              backgroundcolor: #333333;
              height: 100vh;
              fontfamily: "Roboto", sansserif;
              color: #fff;
              position: relative;
              textalign: center;
            }
            .container {
              maxwidth: 700px;
              width: 100%;
              height: 100%;
              margin: 0 auto;
            }
            .wrapper {
              padding: 0 15px;
            }
            .card {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(50%, 50%);
              width: 100%;
            }
            span {
              color: #008000;
            }
            button {
              padding: 1em 6em;
              borderradius: 5px;
              border: 0;
              backgroundcolor: hsl(120, 70%, 51%);
              transition: all 0.3s easein;
              cursor: pointer;
            }
            button:hover {
              backgroundcolor: hsl(45, 70%, 51%);
              transition: all 0.3s easein;
            }
            .spacing {
              margintop: 5rem;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="wrapper">
              <div class="card">
                <h1><span>Welcome !</span>  !</h1>
                <p>Please reset your password by clicking on the button bellow 👇🏻</p>
                <a href=${url}><button>Reset your password</button></a>
                <p class="spacing">
                  If the button above does not work, please navigate to the link
                  provided below 👇🏻
                </p>
                <div><a href="${url}">Click This Link</a></div>
              </div>
            </div>
          </div>
        </body>
      </html>`,
      });

      // success
      res
        .status(200)
        .send({ msg: "Rest Password Email Sent, please check your email." });
    } catch (err) {
      console.log(err.message);
      // res.status(400).send({ msg: err.message });
      res
        .status(500)
        .send({ msg: "Something Went Wrong , Please Try Again !" });
    }
  },
  reset: async (req, res) => {
    try {
      // get password
      const { token, password } = req.body;
      const { id } = jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET);

      // hash password
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      // update password
      await Admin.findOneAndUpdate({ _id: id }, { password: hashPassword });

      // reset success
      res.status(200).send({ msg: "Password was updated successfully." });
    } catch (err) {
      res.status(500).send({ msg: "Token Expired , Please Try Again" });
    }
  },
  change: async (req, res) => {
    try {
      // get password
      const { id, currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword || !id)
        return res.status(400).send({ msg: "Please Fill All Fields" });

      //get Admin
      const admin = await Admin.findById({ _id: id });
      if (!admin) return res.status(401).send({ msg: "Unauthorized" });

      //check if Current Password Matches
      const isMatch = await bcrypt.compare(currentPassword, agent.password);
      if (!isMatch)
        return res
          .status(401)
          .send({ msg: "Unauthorized : Incorrect password." });

      //validate newPassword complexity
      if (!validatePassword(newPassword))
        return res.status(400).send({
          msg: "Password must be at least 8 characters long, containing at least one uppercase letter, one lowercase letter, and one digit",
        });

      // hash password
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(newPassword, salt);

      // update password
      await Admin.findOneAndUpdate({ _id: id }, { password: hashPassword });

      // reset success
      res.status(201).send({ msg: "Password was updated successfully." });
    } catch (err) {
      res.status(500).send({ msg: err.message });
    }
  },
  updateAdmin: async (req, res) => {
    const id = req.body.id;
    if (req.body.email && req.body.email !== "") {
      const email = req.body.email;
      const adminExists = await Admin.findOne({
        email: email,
        _id: { $ne: id },
      });
      if (adminExists)
        return res.status(400).send({ msg: "Email Address is Already Used." });
    }
    Admin.findById(id).exec(async function (err, admin) {
      if (err) {
        return res.status(400).send({ msg: "Admin Not Found" });
      } else {
        // if (req.file) {
        //   admin.profileimg = req.file.path;
        // }
        const email = req.body.email;
        const newPassword = req.body.newPassword;
        const currentPassword = req.body.currentPassword;
        if (!currentPassword || !newPassword || !email)
          return res.status(400).send({ msg: "Please Fill All Fields" });
        const isMatch = await bcrypt.compare(currentPassword, admin.password);
        if (!isMatch)
          return res.status(400).json({ msg: "Incorrect Password !" });
        if (!validateEmail(email))
          return res.status(400).send({ msg: "Invalid Email." });
        //validate newPassword complexity
        if (!validatePassword(newPassword))
          return res.status(400).send({
            msg: "Password must be at least 8 characters long, containing at least one uppercase letter, one lowercase letter, and one digit",
          });
        // hash password
        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(newPassword, salt);
        admin.password = hashPassword;
        admin.email = email;
        admin.save(function (err, updatedAdmin) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          } else {
            console.log(updatedAdmin);
            res.status(201).send(updatedAdmin);
          }
        });
      }
    });
  },
};
const createAccessToken = (client) => {
  return jwt.sign(client, config.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};
const createRefreshToken = (client) => {
  return jwt.sign(client, config.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
};
const createToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
function validatePassword(password) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  return regex.test(password);
}
module.exports = adminController;
