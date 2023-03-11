const jwt = require("jsonwebtoken");

//a middleware fct before action to pass acess
const authUs = (req, res, next) => {
  try {
    // check accsess token
    const token = req.header("Authorization");
    if (!token) return res.status(400).json({ msg: "Authentication failed." })

    // validate to see if our server is signed in
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) return res.status(400).json({ msg: "Authentication failed." });
      // success
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = authUs;