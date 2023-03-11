var Client = require("../models/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("./config");
const transporter = require("../middleware/transporter");
const _ = require("lodash");
require("dotenv").config();
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");

const clientController = {
  register: async (req, res) => {
    try {
      const {
        firstname,
        lastname,
        username,
        email,
        password,
        phone,
        birthdate,
        profileimg,
      } = req.body;

      if (
        !firstname ||
        !lastname ||
        !username ||
        !phone ||
        !birthdate ||
        !profileimg ||
        !email ||
        !password
      )
        return res.status(400).json({ msg: "Please fill in all fields." });

      if (!validateEmail(email))
        return res.status(400).json({ msg: "Invalid emails." });

      const client = await Client.findOne({
        $or: [{ email: email }, { username: username }],
      });
      if (client)
        return res.status(400).json({ msg: "Client already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password is at least 6 characters long." });

      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);

      const newClient = new Client({
        firstname,
        lastname,
        username,
        phone,
        birthdate,
        profileimg,
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
            const url = `http://localhost:3000/auth/activate/${emailToken}`;

            transporter.sendMail({
              to: newClient.email,
              subject: "Confirm Email",
              html: `Please Confirm your Email: <a href="${url}">Click This Link</a>`,
            });
          } else {
            // console.log("Email Error : " + err);
            return res.status(401).send('Unauthorized');
          }
        }
      );

      // Save mongodb
      await newClient.save();

      return res.status(201).json({
        msg: "Register Success! Please activate your email to start.",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
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
      return res.status(200).send("Email Verified");
      // return res.redirect("http://localhost:3000/users/login");
    } catch (e) {
      res.status(500).json({ e: e.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const client = await Client.findOne({ email });
      if (!client)
        return res.status(400).json({ msg: "This email does not exist." });

      const isMatch = await bcrypt.compare(password, client.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });
      if (!client.confirmed)
        return res.status(401).send({ msg: "Please Verify your Email" });
      const refreshtoken = createRefreshToken({
        id: client._id,
        role: client.role,
      });
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/auth/refresh_token",
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2d
      });

      res.json({ msg: "Login success!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/auth/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  refreshToken: (req, res) => {
    try {
      const exp = req.body.exp;
      const currentTime = Math.floor(Date.now() / 1000); // get current time in seconds
      if (exp < currentTime) return res.status(401).send("Unauthorized : Token Expired");
      const newToken = createRefreshToken({
        id: req.body.id,
        role: req.body.role,
      });
      res
        .cookie("refreshtoken", newToken, {
          httpOnly: true,
          path: "/auth/refresh_token",
          maxAge: 2 * 24 * 60 * 60 * 1000, // 2d
        })
        .send("New Token Generated");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getClient: async (req, res) => {
    const id = req.body.id;
    // Get the user profile based on the ID
    const loggedInClient = await Client.findById(id);

    // Return the user profile
    res
      .status(200)
      .send(
        _.pick(loggedInClient, ["firstname", "lastname", "email", "username"])
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
};
const createRefreshToken = (client) => {
  return jwt.sign(client, config.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
module.exports = clientController;
