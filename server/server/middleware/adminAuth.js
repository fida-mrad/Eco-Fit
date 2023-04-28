const jwt = require('jsonwebtoken')
const config = require('../controllers/config');
const auth = async (req, res, next) =>{
    const token = req.cookies.refreshtoken;

    if (!token) {
      return res.status(401).send("Not Authorized");
    }
    try {
      // const { id,role } = jwt.verify(token, config.REFRESH_TOKEN_SECRET);
      const { role } = jwt.verify(token, config.REFRESH_TOKEN_SECRET);
      if(role!="Admin") return res.status(401).send("Not Authorized");
      next();
    } catch (ex) {
      // Invalid token
      res.status(401).send("Not Authorized");
    }
}

module.exports = auth