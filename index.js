const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');

const swaggerDocument = yaml.load('./swagger.yaml');
require('dotenv').config()

const {authRoutes, bookRoutes} = require('./routes');
const {requireAuth, checkUser} = require('./middleware/authMiddleware.js');
const {isAdmin, isLibrarian} = require('./middleware/accessMiddleware.js');

const app = express();

/**
 * MIDDLEWARES
 */
app.use(express.json());
app.use(cookieParser());
app.use(morgan("common"));

const dbUri = process.env.DB_URL || 'mongodb://localhost:27017/slms';
mongoose.connect(dbUri)
  .then((_) => app.listen(3000, () => console.log("Server Running on port 3000")))
  .catch(err => console.log(err));

app.get("*", checkUser);
app.get("/admin", requireAuth, isAdmin, (req, res) => res.json({user: res.locals.user.email}))
app.get("/page", requireAuth, isLibrarian, (req, res) => res.json({user: res.locals.user.email}))
app.use("/api", authRoutes);
app.use("/api/library", bookRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
