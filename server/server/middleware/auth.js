const jwt = require("jsonwebtoken");
const config = require("../controllers/config");
const axios = require("axios");
require("dotenv").config();

const authAdmin = async (req, res, next) => {
  const token = req.cookies.refreshtoken;
  // console.log(token);
  if (!token) {
    return res.status(401).send("Unauthorized, No Token");
  }
  try {
    const { id, role, exp } = jwt.verify(token, config.REFRESH_TOKEN_SECRET);
    if (role != "Admin") return res.status(403).send("Access Denied");
    req.body.id = id;
    req.body.exp = exp;
    req.body.role = role;
    next();
  } catch (ex) {
    // Invalid token
    return res.status(500).send({msg : ex.message});
  }
};
const authClient = async (req, res, next) => {
  const token = req.cookies.refreshtoken;
  if (!token) {
    if (req.cookies.session) {
      const decodedToken = JSON.parse(
        Buffer.from(req.cookies.session, "base64").toString("utf-8")
      );
      if (Object.keys(decodedToken).length !== 0) {
        if (decodedToken.passport.user.role != "Client") {
          return res.status(403).send("Access Denied");
        }

        req.body.id = decodedToken.passport.user._id;
        // req.body.exp = exp;
        req.body.role = decodedToken.passport.user.role;
        next();
      } else {
        return res.status(401).send("Unauthorized , No Token Found");
      }
    } else {
      return res.status(401).send("Unauthorized , No Token Found");
    }
  } else {
    try {
      const { id, role, exp } = jwt.verify(token, config.REFRESH_TOKEN_SECRET);
      if (role != "Client") return res.status(403).send("Access Denied");
      req.body.id = id;
      req.body.exp = exp;
      req.body.role = role;
      next();
    } catch (ex) {
      console.log(ex);
      return res.status(500).send({ msg: ex.message });
    }
  }
};
const authAgent = async (req, res, next) => {
  const token = req.cookies.refreshtoken;

  if (!token) {
    return res.status(401).send("Unauthorized, No Token Found");
  }
  try {
    const { id, role, exp } = jwt.verify(token, config.REFRESH_TOKEN_SECRET);
    if (role != "Agent") return res.status(403).send("Access Denied");
    req.body.id = id;
    req.body.exp = exp;
    req.body.role = role;
    next();
  } catch (ex) {
    res.status(401).send("Unauthorized");
  }
};
const validateReCAPTCHA = async (req, res, next) => {
  ////Destructuring response token and input field value from request body
  const { email, password, token } = req.body;

  try {
    // Sending secret key and response token to Google Recaptcha API for authentication.
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.REACT_APP_SECRET_KEY}&response=${token}`
    );

    // Check response status and send back to the client-side
    if (response.data.success) {
      req.body.email = email;
      req.body.password = password;
      next();
    } else {
      return res.status(401).send({ msg: "Unauthorized" });
    }
  } catch (error) {
    // Handle any errors that occur during the reCAPTCHA verification process
    console.log(error);
    res.status(500).send("Error verifying reCAPTCHA");
  }
};

module.exports = { authAdmin, authClient, authAgent, validateReCAPTCHA };
