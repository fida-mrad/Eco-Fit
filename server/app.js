 var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
//const fileUpload = require('express-fileupload')
var logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
//require('./passport-config');
// const session = require('express-session');
// require('dotenv').config();
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
var ordersRouter = require('./routes/orders.router');
var categoryRouter= require('./routes/category.router');
var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth.router");
var agentRouter = require("./routes/agent.router");
var adminRouter = require("./routes/admin.router");
var clientRouter = require("./routes/client.router");
var productsRouter = require("./routes/products.router");
var blogsRouter = require("./routes/blog.router");
const db = require("./config/dbconnection");
const dotenv = require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SERCRET_KEY);
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// app.use(fileUpload({
//   useTempFiles: true
// }))

// Handeling CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
    // Initialise a session
    app.use(
      cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
  );

// register regenerate & save after the cookieSession middleware initialization
app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb) => {
      cb();
    };
  }
  next();
});

// Initialise the auth
app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// app.use('/uploads', express.static('uploads'));
app.use("/images/:path/:filename", (req, res) => {
  const filename = req.params.filename;
  // const filePath = path.join(__dirname, 'uploads',filename);
  const filePath = path.join(__dirname,req.params.path,filename);
  res.sendFile(filePath);
});
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/agent", agentRouter);
app.use("/admin", adminRouter);
app.use("/client", clientRouter);
app.use("/products", productsRouter);
app.use("/blogs" , blogsRouter);
app.use('/orders', ordersRouter);
app.use('/categories', categoryRouter);
app.use('/api', require('./routes/upload'))


// login facebook
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
//stripe api 
app.post("/checkout", async (req, res) => {
    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item)=> {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }        
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    //show the user the session that stripe create for them
    res.send(JSON.stringify({
        url: session.url
    }));
});
module.exports = app;
