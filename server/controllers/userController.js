const { mailSender } = require("../helpers/mailSender");
const createToken = require("../helpers/createToken");
const bcrypt = require("bcryptjs");
//const User = require("../models/userModel");
const Client = require("../models/client");
const Agent = require("../models/agent");
const Admin = require("../models/admin");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("./config");
require("dotenv").config();

const userController = {
  forgot: async (req, res) => {
    try {
      // get email
      const { email } = req.body;

      // check email if exits in db
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "This email is not registered in our system." });

      // create ac token
      const ac_token = createToken.access({ id: user.id });

      // send email
      const url = `${ac_token}`;
      const name = user.name;
      mailSender(
        email,
        "FORGOT PASSWORD TOKEN ",
        `<html lang="en">
      <head>
        <meta charset="UTF8" />
        <meta httpequiv="XUACompatible" content="IE=edge" />
        <meta name="viewport" content="width=devicewidth, initialscale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap"
          rel="stylesheet"
        />
        <title>Passioncorners | Account Activation</title>
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
              <div>${url}</div>
            </div>
          </div>
        </div>
      </body>
    </html>`
      );

      // success
      res
        .status(400)
        .json({ msg: "Resend the password, please check your email." });
    } catch (err) {
      res.status(200).json({ msg: err.message });
    }
  },
  reset: async (req, res) => {
    try {
      // get password
      const { password } = req.body;

      // hash password
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      // update password
      await User.findOneAndUpdate(
        { _id: req.user.id },
        { password: hashPassword }
      );

      // reset success
      res.status(200).json({ msg: "Password was updated successfully." });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getUser: async (req, res) => {
    const token = req.cookies.refreshtoken;
    if (!token) {
      // if (req.cookies.session) {
        const decodedToken = JSON.parse(
          Buffer.from(req.cookies.session, "base64").toString("utf-8")
        );
        if (Object.keys(decodedToken).length !== 0) {
          let user = decodedToken.passport.user;
          return res.status(200).send(_.omit(user,"password"));
          // if (user.role === "Client") {
          //   // Get the client profile based on the ID
          //   const loggedInUser = await Client.findById(user._id);
          //   if (!loggedInUser) {
          //     return res.status(400).send({ msg: "Client Not Found" });
          //   }
          //   res.header("Access-Control-Allow-Credentials", true);
          //   // Return the client profile
          //   res
          //     .status(200)
          //     .send(
          //       _.pick(loggedInUser, [
          //         "firstname",
          //         "lastname",
          //         "email",
          //         "username",
          //         "role",
          //         "_id",
          //       ])
          //     );
          // } else if (user.role === "Admin") {
          //   const loggedInUser = await Admin.findById(user._id);
          //   if (!loggedInUser) {
          //     return res.status(400).send({ msg: "Admin Not Found" });
          //   }
          //   res.header("Access-Control-Allow-Credentials", true);
          //   // Return the client profile
          //   res
          //     .status(200)
          //     .send(_.pick(loggedInUser, ["email", "role", "_id"]));
          // } else if (user.role === "Agent") {
          //   const loggedInUser = await Agent.findById(user._id).populate(
          //     "brand"
          //   );
          //   if (!loggedInUser) {
          //     return res.status(400).send({ msg: "Agent Not Found" });
          //   }
          //   res.header("Access-Control-Allow-Credentials", true);
          //   // Return the client profile
          //   res
          //     .status(200)
          //     .send(
          //       _.pick(loggedInUser, [
          //         "firstname",
          //         "lastname",
          //         "email",
          //         "profileimg",
          //         "role",
          //         "_id",
          //         "approved",
          //         "banned",
          //         "confirmed",
          //         "brand",
          //       ])
          //     );
          // }
        } else {
          return res.status(401).send("Unauthorized , No Token Found");
        }
      // } else {
      //   return res.status(401).send("Unauthorized , No Token Found");
      // }
    } else {
      try {
        const { id, role } = jwt.verify(token, config.REFRESH_TOKEN_SECRET);
        if (role === "Client") {
          const loggedInUser = await Client.findById(id);
          if (!loggedInUser) {
            return res.status(400).send({ msg: "Client Not Found" });
          }
          res.header("Access-Control-Allow-Credentials", true);
          res
            .status(200)
            .send(
              _.pick(loggedInUser, [
                "firstname",
                "lastname",
                "email",
                "username",
                "_id",
              ])
            );
        } else if (role === "Agent") {
          const loggedInUser = await Agent.findById(id);
          if (!loggedInUser) {
            return res.status(400).send({ msg: "Agent Not Found" });
          }
          res.header("Access-Control-Allow-Credentials", true);
          res
            .status(200)
            .send(
              _.pick(loggedInUser, [
                "firstname",
                "lastname",
                "email",
                "profileimg",
                "role",
                "_id",
                "approved",
                "banned",
                "confirmed",
                "brand",
              ])
            );
        } else if (role === "Admin") {
          const loggedInUser = await Admin.findById(id);
          if (!loggedInUser) {
            return res.status(400).send({ msg: "Admin Not Found" });
          }
          res.header("Access-Control-Allow-Credentials", true);
          res.status(200).send(_.pick(loggedInUser, ["email", "_id"]));
        }
      } catch (ex) {
        console.log(ex);
        return res.status(500).send({ msg: ex.message });
      }
    }
  },
};

module.exports = userController;
