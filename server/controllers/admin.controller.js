var Admin = require("../models/admin");
var Client = require("../models/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("./config");
const _ = require("lodash");
require("dotenv").config();
const mongoose = require('mongoose');
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
  isAdmin : async (req,res,next)=>{
    const { email,password } = req.body;

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
  getAdmin: async (req, res) => {
    const id = req.body.id;
    // Get the user profile based on the ID
    const loggedInAdmin = await Admin.findById(id);

    res.header("Access-Control-Allow-Credentials", true);

    // Return the user profile
    res
      .status(200)
      .send(
        _.pick(loggedInAdmin, ["email", "profileimg","role"])
      );
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
    if(!agentId||!mongoose.Types.ObjectId.isValid(agentId)) return res.status(400).send('Agent Not Specified');
    let approvedAgent = await Agent.findOneAndUpdate(
        { _id: agentId },
        { approved: true },
        {
          returnOriginal: false,
        }
      );
      if(!approvedAgent) return res.status(400).send('Agent Not Found');
      return res.status(200).send("Brand Agent Approved");
  },
};
const createAccessToken = (client) => {
  return jwt.sign(client, config.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};
const createRefreshToken = (client) => {
  return jwt.sign(client, config.REFRESH_TOKEN_SECRET, { expiresIn: "15m" });
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
module.exports = adminController;
