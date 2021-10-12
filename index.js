const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('dotenv').config()

const app = express();
const {authRoutes} = require('./routes');
const {requireAuth, checkUser} = require('./middleware/authMiddleware.js');

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
app.get("/page", requireAuth, (req, res) => res.json({user: res.locals.user.email}))
app.use("/api", authRoutes)
