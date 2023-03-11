const {mailSender} = require('../helpers/mailSender')
const createToken = require("../helpers/createToken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

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
      mailSender(email,`<h1>${url}</h1>`);
             
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
   
};


module.exports = userController;