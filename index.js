const express = require('express');
const app = express();
require("dotenv").config();
require("./start/middlewares")(app);
require("./start/routes")(app);
require("./config/db")(app);

// todo: Loyihada yangi model yaratilishi kerak Order uchun
// todo: Uning quyidagi xossalari bo'lishi kerak
// todo: userId, products, totalAmount, address, status