const http = require('http');
const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

const passportSetup = require("./passport");
const bodyParser = require('body-parser');
const passport = require('passport');
const dotenv = require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SERCRET_KEY);

const DB = require('./config/dbconnection')
const path = require("path");


const load = async () => {

    const app = express();

    app.use(bodyParser.urlencoded({extended: false}));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(morgan('dev'));

   

// app.use(fileUpload({
//   useTempFiles: true
// }))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
    dotenv.config();

    mongoose
        .connect(process.env.MONGODB_URI)
        .then(() => {
        console.log("connected to db");
        })
        .catch((err) => {
        console.log(err.message);
        });

    // Initialise a session
    app.use(
        cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
    );

    // register regenerate & save after the cookieSession middleware initialization
    app.use(function(request, response, next) {
        if (request.session && !request.session.regenerate) {
            request.session.regenerate = (cb) => {
                cb()
            }
        }
        if (request.session && !request.session.save) {
            request.session.save = (cb) => {
                cb()
            }
        }
        next()
    })

    // Initialise the auth
    app.use(passport.initialize());
    app.use(passport.session());

    // Handeling CORS
    const corsOptions = {
        origin: "http://localhost:3000",
        credentials: true, //access-control-allow-credentials:true
        optionSuccessStatus: 200,
        methods: "GET, PUT, POST, DELETE",
        allowedHeaders: "Content-Type,Authorization",
        exposedHeaders: "Content-Type,Authorization",
    };
    app.use(cors(corsOptions));



// app.use('/uploads', express.static('uploads'));
    app.use("/images/:path/:filename", (req, res) => {
        const filename = req.params.filename;
        // const filePath = path.join(__dirname, 'uploads',filename);
        const filePath = path.join(__dirname,req.params.path,filename);
        res.sendFile(filePath);
    });

    // Connecting to the routes
    const clientRoutes = require('./routes/client.router');
    app.use('/client', clientRoutes);

    const authRoute = require('./routes/auth.router');
    app.use('/auth', authRoute)
    
    const productsRouter = require('./routes/products.router');
    app.use('/products', productsRouter);
    
    const ordersRouter = require('./routes/orders.router');
    app.use('/orders', ordersRouter );


    const categoryRouter = require('./routes/category.router');
    app.use('/categories', categoryRouter );

  



    // Handling failed routes
    app.use((req, res, next) => {
        const error = new Error('Not found');
        error.status = 404;
        next(error);
    });

    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json({
            error: {
                message: error.message
            }
        });
    });

    return app;
}



const startServer = async (App = { load }) => {
    const port = process.env.PORT || 8000;
    const app = await App.load();
    const server = http.createServer(app);

    server.listen(port, () => console.info(`Server is connected to port ${port}`))
          .on( "error", () => console.error(`Server failed to start on port ${port}`));

}
    
startServer().catch((err) => {
    console.error({ message: err.message, stack: err.stack })
    process.exit(1)
});

