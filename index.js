const express = require('express');
const app = express();
require("dotenv").config();
require("./start/middlewares")(app);
require("./start/routes")(app);
require("./config/db")(app);