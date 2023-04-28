const jwt = require("jsonwebtoken");

const createToken = {
  
  access: (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "15m" });
  },
};

module.exports = createToken;