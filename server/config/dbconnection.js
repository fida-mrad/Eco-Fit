// const mongoose = require("mongoose");

// // The MongoDB URI to establish connection to the remote cluster
// const DB_URI = "mongodb+srv://asma:asma@eco-fit-cluster.mipbscd.mongodb.net/?retryWrites=true&w=majority"

// const open = () => {
//   return new Promise((resolve, reject) => {
//       mongoose
//           .connect( DB_URI , { useNewUrlParser: true, useUnifiedTopology: true })
//           .then((res, err) => {
//               if (err) return reject(err);
//               resolve();
//           })
//           .catch(err => console.log(err));
//   });
// }

// module.exports = { open };
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://0.0.0.0:27017/ecoFit",
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeded");
    } else {
      console.log("Error in DB conncection: " + err);
    }
  }
);
