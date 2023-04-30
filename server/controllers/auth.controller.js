var Client = require("../models/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("./config");
const transporter = require("../middleware/transporter");
const _ = require("lodash");
require("dotenv").config();
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const cookie = require("cookie");

const clientController = {
  register: async (req, res) => {
    console.log(req.body);
    try {
      const {
        firstname,
        lastname,
        username,
        email,
        password,
        phone,
        birthdate,
        // profileimg,
      } = req.body;

      if (
        !firstname ||
        !lastname ||
        !username ||
        !phone ||
        !birthdate ||
        // !profileimg ||
        !email ||
        !password
      )
        return res.status(400).send({ msg: "Please fill in all fields." });

      if (!validateEmail(email))
        return res.status(400).send({ msg: "Invalid Email." });

      const client = await Client.findOne({
        $or: [{ email: email }, { username: username }],
      });
      if (client) return res.status(400).send({ msg: "Email Already in Use." });

      if (!validatePassword(password))
        return res.status(400).send({
          msg: "Password must be at least 8 characters long, containing at least one uppercase letter, one lowercase letter, and one digit",
        });

      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);

      const newClient = new Client({
        firstname,
        lastname,
        username,
        phone,
        birthdate,
        // profileimg,
        email,
        password: passwordHash,
      });
      jwt.sign(
        {
          client: _.pick(newClient, "id"),
        },
        process.env.ACTIVATION_TOKEN_SECRET,
        {
          expiresIn: "15m",
        },
        (err, emailToken) => {
          if (!err) {
            const url = `http://localhost:8000/auth/activate/${emailToken}`;

            transporter.sendMail({
              to: newClient.email,
              subject: "Confirm Email",
              // html: `Please Confirm your Email: <a href="${url}">Click This Link</a>`,
              html: `<html lang="en">
      <head>
        <meta charset="UTF8" />
        <meta httpequiv="XUACompatible" content="IE=edge" />
        <meta name="viewport" content="width=devicewidth, initialscale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
          rel="stylesheet"
        />
        <title>EcoFit | Account Activation</title>
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
              <p>Please Activate Your Email By Clicking The Button Bellow 👇🏻</p>
              <a href=${url}><button>Confirm Your Email</button></a>
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
          } else {
            return res.status(401).send("Unauthorized");
          }
        }
      );

      // Save mongodb
      await newClient.save();

      return res.status(201).send({
        msg: "Register Success! Please activate your email to start.",
      });
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  },
  confirmEmail: async (req, res) => {
    try {
      const { client } = jwt.verify(
        req.params.token,
        process.env.ACTIVATION_TOKEN_SECRET
      );
      const { id } = client;
      let updatedUser = await Client.findOneAndUpdate(
        { _id: id },
        { confirmed: true },
        {
          returnOriginal: false,
        }
      );
      return res.redirect("http://localhost:3000/login");
    } catch (e) {
      res.status(500).json({ e: e.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const client = await Client.findOne({ email });
      if (!client)
        return res.status(400).send({ msg: "Incorrect Credentials." });

      const isMatch = await bcrypt.compare(password, client.password);
      if (!isMatch)
        return res.status(400).send({ msg: "Incorrect Credentials." });
      if (!client.confirmed)
        return res.status(401).send({ msg: "Please Verify your Email" });
      if (client.banned)
        return res.status(401).send({ msg: "You are currently banned" });
      const refreshtoken = createRefreshToken({
        id: client._id,
        role: client.role,
      });
      console.log(refreshtoken)
      res.header("Access-Control-Allow-Origin", "http://localhost:3000");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.header("Access-Control-Allow-Credentials", true); // Include this line
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1d
      });

      res.send({ msg: "Login success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.header("Access-Control-Allow-Credentials", true);
      res.clearCookie("refreshtoken");
      res.clearCookie("session");
      return res.json({ msg: "Logged out" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },

  refreshToken: (req, res) => {
    try {
      // const exp = req.body.exp;
      // const currentTime = Math.floor(Date.now() / 1000); // get current time in seconds
      // if (exp < currentTime)
      //   return res.status(401).send("Unauthorized : Token Expired");
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
  getClient: async (req, res) => {
    const id = req.body.id;
    // Get the client profile based on the ID
    const loggedInClient = await Client.findById(id);

    res.header("Access-Control-Allow-Credentials", true);

    // Return the client profile
    res.status(200).send(
      _.pick(loggedInClient, [
        "_id",
        "firstname",
        "lastname",
        "email",
        "username",
        "phone",
        "birthdate",
        // "profileimg",
      ])
    );
  },
  enable2FA: async (req, res) => {
    const id = req.body.id;
    var secret = speakeasy.generateSecret({
      name: "Eco-Fit-2FA",
    });
    const loggedInClient = await Client.findById(id);
    if (loggedInClient.tfa) {
      return res
        .status(400)
        .send("Two-Factor Authentication is Already Enabled !");
    } else {
      loggedInClient.set({ tfaSecret: secret.ascii });
      loggedInClient.save();
      qrcode.toDataURL(secret.otpauth_url, (err, data) => {
        return res.status(200).send(data);
      });
    }
  },
  verify2FA: async (req, res, next) => {
    const id = req.body.id;
    const loggedInClient = await Client.findById(id);
    var verified = speakeasy.totp.verify({
      secret: loggedInClient.tfaSecret,
      encoding: "ascii",
      token: req.body.token,
    });
    if (verified) {
      loggedInClient.set({ tfa: true });
      loggedInClient.save();
    }
    // req.body.verified = verified;
    // next();
    return res.send({ verified: verified });
  },
  getClients: async (req, res) => {
    const clients = await Client.find();
    var mapped = _.map(clients, (client) =>
      _.pick(client, [
        "_id",
        "firstname",
        "lastname",
        "email",
        "username",
        "phone",
        "birthdate",
        "banned",
      ])
    );
    return res.status(200).send(mapped);
  },
  forgot: async (req, res) => {
    try {
      // get email
      const { email } = req.body;

      // check email if exits in db
      const client = await Client.findOne({ email });
      if (!client)
        return res
          .status(400)
          .send({ msg: "This email is not registered in our system." });

      // create token
      const token = createToken({ id: client._id });
      const url = `http://localhost:3000/reset/${token}`;
      // send email
      transporter.sendMail({
        to: client.email,
        subject: "Resest Password",
        // html: `To Reset your password Please <a href="${url}">Click This Link</a>`,
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
      res.status(400).send({ msg: err.message });
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
      await Client.findOneAndUpdate({ _id: id }, { password: hashPassword });

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

      //get Client
      const client = await Client.findById({ _id: id });
      if (!client) return res.status(401).json({ msg: "Unauthorized" });

      //check if Current Password Matches
      const isMatch = await bcrypt.compare(currentPassword, client.password);
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
      await Client.findOneAndUpdate({ _id: id }, { password: hashPassword });

      // reset success
      res.status(201).json({ msg: "Password was updated successfully." });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  // getLoggedInUser : async (req,res)=>{
  //   const id = req.body.id;
  //   // Get the client profile based on the ID
  //   const loggedInUser = await Client.findById(id);

  //   res.header("Access-Control-Allow-Credentials", true);

  //   // Return the client profile
  //   res
  //     .status(200)
  //     .send(
  //       _.pick(loggedInUser, ["firstname", "lastname", "email", "username"])
  //     );
  // }
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
module.exports = clientController;
