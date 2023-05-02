const multer = require("multer");
const path = require("path");
//Image Upload
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         // // Construct the destination path based on the current working directory
//         // const dest = path.join(process.cwd(), 'client', 'public', 'images');
//         // cb(null, dest);
//
//         // cb(null, path.join(__dirname, 'public', 'images'));
//
//         cb(null, "uploads/");
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "_" + file.originalname);
//     },
// });
const fileFilter = (req, file, cb) => {
    // if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    //   return cb(new Error('Only image files are allowed!'));
    // }
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        // cb(null, false);
        cb(new Error("Only JPEG and PNG files are allowed!"), false);
    }
};
// var upload = multer({ storage: storage, fileFilter: fileFilter });

// module.exports = upload;
