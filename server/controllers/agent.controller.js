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
        return res
          .status(401)
          .send({
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
        maxAge: 15 * 60 * 60 * 1000, // 15m
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
          maxAge: 15 * 60 * 60 * 1000, // 15m
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
};
const createAccessToken = (agent) => {
  return jwt.sign(agent, config.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};
const createRefreshToken = (agent) => {
  return jwt.sign(agent, config.REFRESH_TOKEN_SECRET, { expiresIn: "15m" });
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
module.exports = agentController;
