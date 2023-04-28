const Agent = require("../models/agent");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("./config");
const transporter = require("../middleware/transporter");
const _ = require("lodash");
const mongoose = require("mongoose");
const Brand = require("../models/brand");
require("dotenv").config();

const agentController = {
  register: async (req, res) => {
    try {
      const firstname = req.body.firstname;
      const lastname = req.body.lastname;
      const email = req.body.email;
      const password = req.body.password;
      const profileimg = req.file.path;
      const brand = req.body.brand;
      if (
        !firstname ||
        !lastname ||
        !brand ||
        !profileimg ||
        !email ||
        !password
      )
        return res.status(400).send({ msg: "Please fill in all fields." });

      if (!validateEmail(email))
        return res.status(400).send({ msg: "Invalid Email." });

      const agent = await Agent.findOne({ email });
      if (agent)
        return res.status(400).send({ msg: "You Already Have An Account." });

      if (!validatePassword(password))
        return res.status(400).send({
          msg: "Password must be at least 8 characters long, containing at least one uppercase letter, one lowercase letter, and one digit",
        });

      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);

      const newBrand = new Brand({
        brandname: req.body.brand.brandname,
      });
      await newBrand.save();

      const newAgent = new Agent({
        firstname,
        lastname,
        profileimg,
        email,
        password: passwordHash,
        // brand: brand,
        brand: newBrand,
      });
      //Create Email Verification Token
      jwt.sign(
        {
          agent: _.pick(newAgent, "id"),
        },
        process.env.ACTIVATION_TOKEN_SECRET,
        {
          expiresIn: "15m",
        },
        (err, emailToken) => {
          if (!err) {
            console.log("emailToken : " + emailToken);
            const url = `http://localhost:8000/agent/activate/${emailToken}`;

            transporter.sendMail({
              to: newAgent.email,
              subject: "Email Confirmation",
              html: `Please click this email to confirm your email: <a href="${url}">Click This Link</a>`,
            });
          } else {
            console.log("Email Error : " + err);
          }
        }
      );

      // Save mongodb
      await newAgent.save();
      return res.status(201).send({
        msg: "Register Success! Please activate your email to start.",
      });
    } catch (err) {
      return res.status(500).send({ msg: err.message });
    }
  },
  confirmEmail: async (req, res) => {
    try {
      const { agent } = jwt.verify(
        req.params.token,
        process.env.ACTIVATION_TOKEN_SECRET
      );
      const { id } = agent;
      let confirmedAgent = await Agent.findOneAndUpdate(
        { _id: id },
        { confirmed: true },
        {
          returnOriginal: false,
        }
      );
      // return res.status(200).send("Email Verified");
      return res.redirect("http://localhost:3000/agentlogin");
    } catch (e) {
      res.status(500).json({ e: e.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const agent = await Agent.findOne({ email });
      if (!agent)
        return res.status(400).send({ msg: "Incorrect Credentials." });

      const isMatch = await bcrypt.compare(password, agent.password);
      if (!isMatch)
        return res.status(400).send({ msg: "Incorrect Credentials." });
      if (!agent.confirmed)
        return res.status(401).send({ msg: "Please Verify your Email" });
      if (!agent.approved)
        return res.status(401).send({
          msg: "You must be approved to Log in , please await your approval",
        });
      if (agent.banned)
        return res.status(401).send({ msg: "You are currently banned" });
      const refreshtoken = createRefreshToken({
        id: agent._id,
        role: agent.role,
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
  getAgent: async (req, res) => {
    const id = req.body.id;
    // Get the user profile based on the ID
    const loggedInAgent = await Agent.findById(id).populate("brand");

    res.header("Access-Control-Allow-Credentials", true);

    // Return the user profile
    res.status(200).send(
      _.pick(loggedInAgent, [
        "firstname",
        "lastname",
        "email",
        "profileimg",
        "brand",
        "_id",
      ])
      // _.pick(loggedInAgent, ["firstname", "lastname", "email", "profileimg","brand.brandname"])
    );
  },
  getAgents: async (req, res) => {
    const agents = await Agent.find().populate("brand");
    var mapped = _.map(agents, (agent) =>
      _.pick(agent, [
        "_id",
        "firstname",
        "lastname",
        "email",
        "brand",
        "approved",
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
      const agent = await Agent.findOne({ email });
      if (!agent)
        return res
          .status(400)
          .send({ msg: "This email is not registered in our system." });

      // create token
      const token = createToken({ id: agent._id });
      const url = `http://localhost:3000/agent/reset/${token}`;
      // send email
      transporter.sendMail({
        to: agent.email,
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
      // res.status(400).send({ msg: err.message });
      res.status(500).send({ msg: "Something Went Wrong , Please Try Again !" });
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
      await Agent.findOneAndUpdate({ _id: id }, { password: hashPassword });

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

      //get Agent
      const agent = await Agent.findById({ _id: id });
      if (!agent)
        return res.status(401).send({ msg: "Unauthorized : Agent Not Found " });

      //check if Current Password Matches
      const isMatch = await bcrypt.compare(currentPassword, agent.password);
      if (!isMatch)
        return res
          .status(401)
          .send({ msg: "Unauthorized : Incorrect Password." });

      //validate newPassword complexity
      if (!validatePassword(newPassword))
        return res.status(400).send({
          msg: "Password must be at least 8 characters long, containing at least one uppercase letter, one lowercase letter, and one digit",
        });

      // hash password
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(newPassword, salt);

      // update password
      await Agent.findOneAndUpdate({ _id: id }, { password: hashPassword });

      // reset success
      res.status(201).send({ msg: "Password was updated successfully." });
    } catch (err) {
      res.status(500).send({ msg: err.message });
    }
  },
  updateAgent: async (req, res) => {
    const id = req.body.id;
    if (req.body.email && req.body.email !== "") {
      const email = req.body.email;
      // const agentExists = await Agent.findOne({ email });
      const agentExists = await Agent.findOne({
        email: email,
        _id: { $ne: id },
      });
      if (agentExists)
        return res.status(400).send({ msg: "Email Address is Already Used." });
    }
    Agent.findById(id)
      .populate("brand")
      .exec(async function (err, agent) {
        if (err) {
          return res.status(400).send({ msg: "Agent Not Found" });
        } else {
          if (req.file) {
            agent.profileimg = req.file.path;
          }
          updatedAttributes = _.omit(req.body, "id");
          for (let attr in updatedAttributes) {
            const value = updatedAttributes[attr];
            if (attr === "brand" && req.body.brand.brandname) {
              const brandId = agent.brand;
              const brand = await Brand.findById(brandId);
              if (!brand) {
                return res.status(404).send({ message: "Brand not found" });
              }
              brand.brandname = req.body.brand.brandname;
              agent.brand.brandname = updatedAttributes[attr].brandname;
              await brand.save();
            } else {
              if (value !== "") {
                agent[attr] = value;
              }
            }
          }
          agent.save(function (err, updatedAgent) {
            if (err) {
              return res.status(500).send({ msg: err.message });
            } else {
              console.log(updatedAgent);
              res.status(201).send(updatedAgent);
            }
          });
        }
      });

    // Agent.findOne({ _id: id }, function (err, agent) {
    //   // Handle errors
    //   if (err) {
    //     console.log(err);
    //     return res.status(500).send(err.message);
    //   }

    //   // Handle agent not found
    //   if (!agent) {
    //     return res.status(404).send("Agent not found");
    //   }
    //   updatedAttributes = _.omit(req.body, "id");
    //   for (let attr in updatedAttributes) {
    //     const value = updatedAttributes[attr];
    //     if (attr.includes(".")) {
    //       if (value !== "") {
    //         const [arrAttr, index] = attr.split(".");
    //         agent[arrAttr].splice(index, 1, value);
    //       }
    //     } else {
    //       if (value !== "") {
    //         agent[attr] = value;
    //       }
    //     }
    //   }
    //   // Save the updated object in the database
    //   agent.save(function (err, updatedAgent) {
    //     // Handle errors
    //     if (err) {
    //       console.log(err);
    //       return res.status(500).send(err.message);
    //     }
    //     res.status(201).send(updatedAgent);
    //   });
    // });
  },
};
const createAccessToken = (agent) => {
  return jwt.sign(agent, config.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};
const createRefreshToken = (agent) => {
  return jwt.sign(agent, config.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
};
const createActivationToken = (payload) => {
  return jwt.sign({ payload }, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "1d",
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
const createToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};
module.exports = agentController;
