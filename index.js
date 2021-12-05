const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');

const swaggerDocument = yaml.load('./swagger.yaml');
require('dotenv').config()

// Importing routes 
const {authRoutes, bookRoutes, onlineTutsRoutes, miscRoutes, adminRoutes, hostelRoutes} = require('./routes');

// Importing custom authentication and authorization middlewares
const {requireAuth, checkUser} = require('./middleware/authMiddleware.js');
const {isAdmin, isLibrarian} = require('./middleware/accessMiddleware.js');

// creating a new express server object
const app = express();

/**
 * CORS CONFIGURATION
 */
// specify the domains to be allowed by the server 
// for client to send cross origin requests.
const origin = [
  process.env.CLIENT_SERVER_DOMAIN,
  'http://localhost:3000',
  'http://192.168.0.102:3000',
];

// specify the methods to be allowed by the server 
// for client to send cross origin requests.
const methods = [
  'GET', 
  'POST', 
  'PATCH', 
  'PUT', 
  'DELETE', 
  'OPTIONS'
];

/**
 * MIDDLEWARES
 */
app.use(express.json()); // add JSON response method to send JSON response to client
app.use(cookieParser()); // add Cookie response method to send Cookies to client
app.use(cors({ origin, preflightContinue: true, credentials: true, methods }));
app.use(morgan("common")); // Apache2 style logging

/**
 * DATABASE CONNECTION
 */
const dbUri = process.env.DB_URL || 'mongodb://localhost:27017/slms';
mongoose.connect(dbUri)
  .then((_) => app.listen(process.env.PORT || 3001, () => console.log("Server Running on port 3000")))
  .catch(err => console.log(err));

/**
 * ROUTES
 */

// authentication API
app.get("*", checkUser);
app.use("/api", authRoutes);

// library API
app.use("/api/library", bookRoutes);
app.use("/api/tutorials", onlineTutsRoutes);
app.use("/api/admin", checkUser, adminRoutes);
// app.use("/api/admin", requireAuth, isAdmin, adminRoutes);
app.use("/api/misc", miscRoutes);
app.use("/api/hostel", hostelRoutes);
// app.use("/api/hostel", hostelRoutes);

// dummy routes
app.get("/admin", requireAuth, isAdmin, (_, res) => res.json({user: res.locals.user.email}))
app.get("/page", requireAuth, isLibrarian, (_, res) => res.json({user: res.locals.user.email}))
app.get("/getUserName:id", (req, res) => res.json({user: req.params.id}))

// ping route
app.get("/ping", (_, res) => res.json({ping: 'pong'}))

/**
 * SWAGGER API DOCS
 */
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
