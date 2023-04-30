const Client = require("../models/client");
const _ = require("lodash");
// GET all clients
const client_GET_ALL = async (req, res, next) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET one client
const client_GET_ONE = async (req, res, next) => {
  let client;
  try {
    client = await Client.findById(req.params.clientId);
    if (client == null) {
      return res.status(404).json({ message: "Cannot find client" });
    }

    res.client = client;
    res.json(res.client);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// POST a new client
const client_POST = async (req, res) => {
  const client = new Client({
    facebookId: req.body.facebookId,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    birthdate: req.body.birthdate,
    profileimg: req.body.profileimg,
    confirmed: req.body.confirmed,
    cart: req.body.cart,
    tfaSecret: req.body.tfaSecret,
    tfa: req.body.tfa,
    role: req.body.role,
  });
  try {
    const newClient = await client.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// login for the client
const client_loginFacebook = (req, res) => {
  // create JWT token for authenticated user
  const token = Client.generateToken(req.user);
  // send JWT token to client
  res.status(200).json({ token });
};
const updateClient = async (req, res) => {
  const clientId = req.body.clientId;
  Client.findOne({ _id: clientId }, function (err, client) {
    // Handle errors
    if (err) {
      console.log(err);
      return res.status(500).send(err.message);
    }

    // Handle client not found
    if (!client) {
      return res.status(404).send("Client not found");
    }
    updatedAttributes = _.omit(req.body, "clientId", "id");
    for (let attr in updatedAttributes) {
      const value = updatedAttributes[attr];
      // console.log(`${attr} : ${value}`);

      // Use array index notation to update array elements
      if (attr.includes(".")) {
        if (value !== "") {
          const [arrAttr, index] = attr.split(".");
          client[arrAttr].splice(index, 1, value);
        }
      } else {
        if (value !== "") {
          client[attr] = value;
        }
      }
    }
    // Save the updated object in the database
    client.save(function (err, updatedClient) {
      // Handle errors
      if (err) {
        console.log(err);
        return res.status(500).send(err.message);
      }

      // Send the updated object in the response
      // console.log(updatedClient);
      // res.status(201).send({ msg: "Client Updated Successfully" });
      res.status(201).send(updatedClient);
    });
  });
};

// Exporting all controllers
module.exports = {
  client_GET_ALL,
  client_GET_ONE,
  client_POST,
  client_loginFacebook,
  updateClient,
};
